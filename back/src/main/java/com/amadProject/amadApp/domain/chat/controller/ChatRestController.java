package com.amadProject.amadApp.domain.chat.controller;

import com.amadProject.amadApp.domain.chat.dto.ChatDto;
import com.amadProject.amadApp.domain.chat.service.ChatService;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRestController {

    private final ChatService chatService;
    private final MemberService memberService;

    @PostMapping("/rooms")
    public ResponseEntity<ChatDto.RoomIdResponse> createOrGetRoom(
            @RequestParam long member1Id,
            @RequestParam long member2Id) {
        return new ResponseEntity<>(chatService.createOrGetRoom(member1Id, member2Id), HttpStatus.OK);
    }

    @GetMapping("/rooms/member/{memberId}")
    public ResponseEntity<List<ChatDto.RoomResponse>> getRoomsForMember(@PathVariable long memberId) {
        return new ResponseEntity<>(chatService.getRoomsForMember(memberId), HttpStatus.OK);
    }

    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<List<ChatDto.MessageResponse>> getMessages(
            @PathVariable long roomId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return new ResponseEntity<>(chatService.getMessages(roomId, page, size), HttpStatus.OK);
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ChatDto.RoomResponse> getRoom(@PathVariable long roomId) {
        String email = String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Member me = memberService.findMember(email);
        return new ResponseEntity<>(chatService.getRoom(roomId, me.getId()), HttpStatus.OK);
    }
}
