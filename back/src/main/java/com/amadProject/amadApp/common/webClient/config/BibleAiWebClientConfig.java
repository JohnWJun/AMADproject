package com.amadProject.amadApp.common.webClient.config;


import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class BibleAiWebClientConfig {

    @Bean
    public WebClient bibleAiWebClient(
            @Value("${ai.bible.base-url}") String baseUrl,
            @Value("${ai.bible.timeout-seconds:20}") long timeoutSeconds
    ) {
        HttpClient httpClient = HttpClient.create()
                // 연결 자체 타임아웃 (TCP connect)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, (int) (timeoutSeconds * 1000))
                // 전체 응답 타임아웃(서버가 응답 안 하면 끊음)
                .responseTimeout(Duration.ofSeconds(timeoutSeconds))
                // 읽기/쓰기 타임아웃 (스트리밍/큰 바디 대비)
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(timeoutSeconds, TimeUnit.SECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(timeoutSeconds, TimeUnit.SECONDS))
                );

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
