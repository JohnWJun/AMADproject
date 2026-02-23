package com.amadProject.amadApp.domain.chat.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.chat.dto.ChatDto;
import com.amadProject.amadApp.domain.chat.entity.ChatMessage;
import com.amadProject.amadApp.domain.chat.entity.ChatRoom;
import com.amadProject.amadApp.domain.chat.repository.ChatMessageRepository;
import com.amadProject.amadApp.domain.chat.repository.ChatRoomRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;

    private static final DateTimeFormatter UTC_FMT = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    /** Converts a server-local LocalDateTime to a UTC ISO-8601 string with +00:00 offset. */
    private String toUtcString(LocalDateTime ldt) {
        if (ldt == null) return null;
        return ldt.atZone(ZoneId.systemDefault())
                  .withZoneSameInstant(ZoneOffset.UTC)
                  .format(UTC_FMT);
    }

    public ChatDto.RoomIdResponse createOrGetRoom(long member1Id, long member2Id) {
        Optional<ChatRoom> existing = chatRoomRepository.findByMemberPair(member1Id, member2Id);
        if (existing.isPresent()) {
            return new ChatDto.RoomIdResponse(existing.get().getId());
        }

        Member member1 = memberRepository.findById(member1Id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member2 = memberRepository.findById(member2Id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        ChatRoom room = new ChatRoom();
        room.setMember1(member1);
        room.setMember2(member2);
        ChatRoom saved = chatRoomRepository.save(room);
        return new ChatDto.RoomIdResponse(saved.getId());
    }

    public ChatDto.MessageResponse saveMessage(long roomId, String senderEmail, String content) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        Member sender = memberRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        ChatMessage message = new ChatMessage();
        message.setChatRoom(room);
        message.setSender(sender);
        message.setContent(content);
        ChatMessage saved = chatMessageRepository.save(message);

        return new ChatDto.MessageResponse(
                saved.getId(), roomId,
                sender.getEmail(), sender.getNickname(),
                content, toUtcString(saved.getCreatedAt())
        );
    }

    @Transactional(readOnly = true)
    public List<ChatDto.RoomResponse> getRoomsForMember(long memberId) {
        List<ChatRoom> rooms = chatRoomRepository.findAllByMemberId(memberId);
        return rooms.stream().map(room -> {
            Member other = room.getMember1().getId().equals(memberId)
                    ? room.getMember2() : room.getMember1();
            Optional<ChatMessage> last = chatMessageRepository.findTopByChatRoomIdOrderByCreatedAtDesc(room.getId());
            return new ChatDto.RoomResponse(
                    room.getId(),
                    other.getEmail(),
                    other.getNickname(),
                    other.getStatusImg(),
                    last.map(ChatMessage::getContent).orElse(""),
                    toUtcString(last.map(ChatMessage::getCreatedAt).orElse(room.getCreatedAt()))
            );
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ChatDto.MessageResponse> getMessages(long roomId, int page, int size) {
        Page<ChatMessage> messages = chatMessageRepository.findByChatRoomIdOrderByCreatedAtAsc(
                roomId, PageRequest.of(page - 1, size));
        return messages.getContent().stream().map(m -> new ChatDto.MessageResponse(
                m.getId(), roomId,
                m.getSender().getEmail(), m.getSender().getNickname(),
                m.getContent(), toUtcString(m.getCreatedAt())
        )).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getRecipientId(long roomId, String senderEmail) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        return room.getMember1().getEmail().equals(senderEmail)
                ? room.getMember2().getId()
                : room.getMember1().getId();
    }

    @Transactional(readOnly = true)
    public ChatDto.RoomResponse getRoom(long roomId, long memberId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        Member other = room.getMember1().getId().equals(memberId)
                ? room.getMember2() : room.getMember1();
        Optional<ChatMessage> last = chatMessageRepository.findTopByChatRoomIdOrderByCreatedAtDesc(roomId);
        return new ChatDto.RoomResponse(
                room.getId(),
                other.getEmail(),
                other.getNickname(),
                other.getStatusImg(),
                last.map(ChatMessage::getContent).orElse(""),
                toUtcString(last.map(ChatMessage::getCreatedAt).orElse(room.getCreatedAt()))
        );
    }
}
