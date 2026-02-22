package com.amadProject.amadApp.domain.chat.controller;

import com.amadProject.amadApp.domain.chat.dto.ChatDto;
import com.amadProject.amadApp.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/chat/{roomId}")
    public ChatDto.MessageResponse handleMessage(
            @DestinationVariable long roomId,
            @Payload ChatDto.MessageRequest request,
            Principal principal) {
        return chatService.saveMessage(roomId, principal.getName(), request.getContent());
    }
}
