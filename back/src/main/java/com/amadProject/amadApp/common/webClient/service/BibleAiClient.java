package com.amadProject.amadApp.common.webClient.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BibleAiClient {
    private final WebClient bibleAiWebClient;

    public Mono<String> counsel(String textKo) {
        Map<String, Object> body = Map.of(
                "text_ko", textKo,
                "limit_verses", 5
        );

        return bibleAiWebClient.post()
                .uri("/counsel")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                // 추가로 “operator 수준” 타임아웃도 걸어두면 이중 안전장치
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(25))
                .onErrorResume(ex -> Mono.just("{\"error\":\"AI response timeout\"}"));
    }
}
