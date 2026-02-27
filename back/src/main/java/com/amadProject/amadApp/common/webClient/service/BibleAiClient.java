package com.amadProject.amadApp.common.webClient.service;

import com.amadProject.amadApp.domain.billing.config.TierSettings;
import com.amadProject.amadApp.domain.billing.enums.UserTier;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BibleAiClient {
    private final WebClient bibleAiWebClient;

    /**
     * Calls the FastAPI /counsel endpoint with tier-aware parameters.
     *
     * @param textKo      User's message in Korean
     * @param historyKo   Prior conversation turns (empty list for FREE/GRACE users)
     * @param tier        User's subscription tier
     * @param settings    Per-tier limits (max_verses, history_enabled, max_history_turns)
     */
    public Mono<String> counsel(String textKo, List<String> historyKo,
                                UserTier tier, TierSettings settings) {
        Map<String, Object> body = new HashMap<>();
        body.put("text_ko", textKo);
        body.put("history_ko", historyKo != null ? historyKo : List.of());
        body.put("tier", tier.name());
        body.put("max_verses", settings.getMaxVerses());
        body.put("history_enabled", settings.isHistoryEnabled());
        body.put("max_history_turns", settings.getMaxHistoryTurns());

        return bibleAiWebClient.post()
                .uri("/counsel")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(25))
                .onErrorResume(ex -> Mono.just("{\"error\":\"AI response timeout\"}"));
    }
}
