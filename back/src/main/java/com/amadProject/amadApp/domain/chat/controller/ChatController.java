package com.amadProject.amadApp.domain.chat.controller;

import com.amadProject.amadApp.domain.chat.dto.ChatDto;
import com.amadProject.amadApp.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{roomId}")
    public void handleMessage(
            @DestinationVariable long roomId,
            @Payload ChatDto.MessageRequest request,
            Principal principal) {

        ChatDto.MessageResponse response = chatService.saveMessage(roomId, principal.getName(), request.getContent());

        // Broadcast the full message to everyone subscribed to the room
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, response);

        // Send a lightweight ping to the recipient's personal notification topic
        long recipientId = chatService.getRecipientId(roomId, principal.getName());
        messagingTemplate.convertAndSend("/topic/notification/" + recipientId,
                new ChatDto.NotificationPayload(roomId));
    }
}
