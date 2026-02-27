package com.amadProject.amadApp.common.webClient.Controller;

import com.amadProject.amadApp.common.webClient.service.BibleAiClient;
import com.amadProject.amadApp.domain.billing.config.TierProperties;
import com.amadProject.amadApp.domain.billing.enums.UserTier;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatAiController {

    private final BibleAiClient bibleAiClient;
    private final TierProperties tierProperties;

    @PostMapping("/ai")
    public Mono<Map<String, Object>> chatAi(@RequestBody Map<String, String> req) {
        String message = req.getOrDefault("message", "").trim();
        if (message.isEmpty()) {
            return Mono.just(Map.of("error", "message is required"));
        }

        // Legacy endpoint: no auth context → use FREE tier defaults
        return bibleAiClient.counsel(message, java.util.List.of(),
                        UserTier.FREE, tierProperties.getSettings(UserTier.FREE))
                .map(aiResp -> Map.of("answer", aiResp));
    }
}
