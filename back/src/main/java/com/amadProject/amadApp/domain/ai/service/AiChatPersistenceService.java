package com.amadProject.amadApp.domain.ai.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.ai.dto.AiChatDto;
import com.amadProject.amadApp.domain.ai.entity.AiChatMessage;
import com.amadProject.amadApp.domain.ai.repository.AiChatMessageRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Handles all DB operations for AI chat with explicit transaction boundaries.
 * Keeping this separate from AiChatService ensures the DB connection is NOT
 * held open during the (potentially long) AI network call.
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AiChatPersistenceService {

    static final int DAILY_TOKEN_LIMIT = 20_000;
    // Number of recent messages to fetch for history
    private static final int HISTORY_SIZE = 40;

    private final MemberRepository memberRepository;
    private final AiChatMessageRepository aiChatMessageRepository;

    /**
     * Result passed between the "prepare" and "commit" phases.
     */
    @lombok.Getter
    @lombok.AllArgsConstructor
    public static class TokenCheckResult {
        private final Long memberId;
        private final int remaining;
    }

    /**
     * Phase 1 — Called BEFORE the AI network request.
     * Loads the member, resets daily tokens if needed, and verifies quota.
     *
     * @return TokenCheckResult with memberId and remaining token count
     * @throws BusinessLogicException (MEMBER_NOT_FOUND) if member missing
     * @throws IllegalStateException with message "limit_exceeded" if quota exhausted
     */
    public TokenCheckResult checkAndReserve(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // Reset daily usage at midnight
        LocalDate today = LocalDate.now();
        if (!today.equals(member.getAiTokensResetDate())) {
            member.setAiTokensUsedToday(0);
            member.setAiTokensResetDate(today);
        }

        int remaining = DAILY_TOKEN_LIMIT - member.getAiTokensUsedToday();
        if (remaining <= 0) {
            throw new IllegalStateException("limit_exceeded");
        }

        memberRepository.save(member);
        return new TokenCheckResult(member.getId(), remaining);
    }

    /**
     * Phase 2 — Called AFTER a successful AI response.
     * Saves both messages (USER + ASSISTANT) and increments token usage atomically.
     */
    public void persistExchange(Long memberId, String userMessage, String aiText, int tokensUsed) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // Accumulate usage (cap at limit to prevent integer overflow)
        int newUsage = Math.min(DAILY_TOKEN_LIMIT, member.getAiTokensUsedToday() + tokensUsed);
        member.setAiTokensUsedToday(newUsage);
        memberRepository.save(member);

        // Save user message
        AiChatMessage userMsg = new AiChatMessage();
        userMsg.setMember(member);
        userMsg.setRole(AiChatMessage.Role.USER);
        userMsg.setContent(userMessage);
        aiChatMessageRepository.save(userMsg);

        // Save assistant message
        AiChatMessage assistantMsg = new AiChatMessage();
        assistantMsg.setMember(member);
        assistantMsg.setRole(AiChatMessage.Role.ASSISTANT);
        assistantMsg.setContent(aiText);
        aiChatMessageRepository.save(assistantMsg);
    }

    /**
     * Returns the last HISTORY_SIZE messages for the member, ordered oldest-first.
     */
    @Transactional(readOnly = true)
    public AiChatDto.HistoryResponse getHistory(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // Reset check for accurate remaining count
        LocalDate today = LocalDate.now();
        int usedToday = today.equals(member.getAiTokensResetDate())
                ? member.getAiTokensUsedToday()
                : 0;

        List<AiChatMessage> recent = aiChatMessageRepository
                .findRecentByMemberId(member.getId(), PageRequest.of(0, HISTORY_SIZE));

        // Reverse so oldest message is first
        List<AiChatMessage> ordered = new ArrayList<>(recent);
        Collections.reverse(ordered);

        List<AiChatDto.MessageResponse> messages = ordered.stream()
                .map(m -> AiChatDto.MessageResponse.builder()
                        .role(m.getRole().name().toLowerCase())
                        .content(m.getContent())
                        .createdAt(m.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return AiChatDto.HistoryResponse.builder()
                .messages(messages)
                .tokensUsedToday(usedToday)
                .remainingTokens(Math.max(0, DAILY_TOKEN_LIMIT - usedToday))
                .dailyLimit(DAILY_TOKEN_LIMIT)
                .build();
    }
}
