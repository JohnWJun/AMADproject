"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Member } from "@/app/_component/MemberRecoilState";
import style from "./aiChatWidget.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageRole = "user" | "assistant";

interface ChatMessage {
    role: MessageRole;
    content: string;
    createdAt?: string;
}

interface ChatResponse {
    status: "ok" | "error" | "limit_exceeded" | "rate_limited";
    message: string;
    remainingTokens: number;
    dailyLimit: number;
}

interface HistoryResponse {
    messages: ChatMessage[];
    tokensUsedToday: number;
    remainingTokens: number;
    dailyLimit: number;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function fetchHistory(accessToken: string, refreshToken: string): Promise<HistoryResponse | null> {
    const res = await fetch("/api/ai-chat/history", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: refreshToken ? `Bearer ${refreshToken}` : "",
        },
        credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
}

async function sendMessage(
    message: string,
    history: string[],
    accessToken: string,
    refreshToken: string,
): Promise<ChatResponse> {
    const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Refresh: refreshToken ? `Bearer ${refreshToken}` : "",
        },
        credentials: "include",
        body: JSON.stringify({ text_ko: message, history_ko: history, limit_verses: 5 }),
    });

    if (!res.ok) {
        const status = res.status;
        if (status === 401 || status === 403) {
            return { status: "error", message: "로그인이 필요합니다.", remainingTokens: 0, dailyLimit: 20000 };
        }
        return { status: "error", message: "서버 오류가 발생했습니다.", remainingTokens: 0, dailyLimit: 20000 };
    }
    return res.json();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AiChatWidget() {
    const memberInfo = useRecoilValue(Member);
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const [remainingTokens, setRemainingTokens] = useState<number | null>(null);
    const [dailyLimit, setDailyLimit] = useState(20000);
    const [errorBanner, setErrorBanner] = useState<string | null>(null);
    const [userHistory, setUserHistory] = useState<string[]>([]);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Load history when panel opens for the first time
    useEffect(() => {
        if (!open || historyLoaded || !memberInfo.email) return;
        (async () => {
            const accessToken = localStorage.getItem("Authorization") || "";
            const refreshToken = localStorage.getItem("Refresh") || "";
            const data = await fetchHistory(accessToken, refreshToken);
            if (data) {
                setMessages(data.messages);
                setRemainingTokens(data.remainingTokens);
                setDailyLimit(data.dailyLimit);
            }
            setHistoryLoaded(true);
        })();
    }, [open, historyLoaded, memberInfo.email]);

    // Scroll to bottom on new messages or panel open
    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    // Focus input when panel opens
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    const handleToggle = () => setOpen((v) => !v);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading) return;
        if (!memberInfo.email) {
            setErrorBanner("로그인이 필요합니다.");
            return;
        }

        setInput("");
        setErrorBanner(null);

        // Optimistic: show user message immediately
        const optimisticMsg: ChatMessage = { role: "user", content: text };
        setMessages((prev) => [...prev, optimisticMsg]);
        setLoading(true);

        const nextHistory = [...userHistory, text].slice(-8);
        setUserHistory(nextHistory);

        const accessToken = localStorage.getItem("Authorization") || "";
        const refreshToken = localStorage.getItem("Refresh") || "";

        const res = await sendMessage(text, nextHistory, accessToken, refreshToken);
        setLoading(false);

        if (res.status === "ok") {
            setMessages((prev) => [...prev, { role: "assistant", content: res.message }]);
            setRemainingTokens(res.remainingTokens);
        } else {
            // Remove optimistic message on failure
            setMessages((prev) => prev.slice(0, -1));
            setInput(text); // restore input
            setErrorBanner(res.message);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const tokenPercent =
        remainingTokens !== null ? Math.round((remainingTokens / dailyLimit) * 100) : null;

    if (!memberInfo.email) return null; // hidden for unauthenticated users

    return (
        <>
            {/* ── Floating trigger button ─────────────────────────────────── */}
            <button
                className={style.fab}
                onClick={handleToggle}
                aria-label="PathFinder"
                title="PathFinder"
            >
                {open ? (
                    // Close icon
                    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
                    </svg>
                ) : (
                    // Cross icon
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-8 13H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V5h8v2z" />
                    </svg>
                )}
            </button>

            {/* ── Chat panel ──────────────────────────────────────────────── */}
            <div className={`${style.panel} ${open ? style.panelOpen : ""}`}>

                {/* Header */}
                <div className={style.header}>
                    <div className={style.headerTitle}>
                        <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6, color: "#6b7280" }}>
                            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        PathFinder
                    </div>
                    {tokenPercent !== null && (
                        <div className={style.tokenBadge} title={`오늘 남은 토큰: ${remainingTokens?.toLocaleString()}`}>
                            <span
                                className={style.tokenDot}
                                style={{
                                    background: tokenPercent > 30
                                        ? "#22c55e"
                                        : tokenPercent > 10
                                            ? "#f59e0b"
                                            : "#ef4444",
                                }}
                            />
                            {tokenPercent}%
                        </div>
                    )}
                </div>

                {/* Message area */}
                <div className={style.messages}>
                    {!historyLoaded && (
                        <div className={style.loadingRow}>
                            <span className={style.typingDot} />
                            <span className={style.typingDot} />
                            <span className={style.typingDot} />
                        </div>
                    )}

                    {historyLoaded && messages.length === 0 && (
                        <div className={style.emptyState}>
                            <p>안녕하세요 😊</p>
                            <p>오늘 말씀이나 기도에 대해 무엇이든 나누어 보세요.</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`${style.bubble} ${msg.role === "user" ? style.bubbleUser : style.bubbleAssistant}`}
                        >
                            {msg.role === "assistant" && (
                                <div className={style.assistantLabel}>AI 상담사</div>
                            )}
                            <p className={style.bubbleText}>{msg.content}</p>
                        </div>
                    ))}

                    {loading && (
                        <div className={`${style.bubble} ${style.bubbleAssistant}`}>
                            <div className={style.assistantLabel}>AI 상담사</div>
                            <div className={style.typingIndicator}>
                                <span className={style.typingDot} />
                                <span className={style.typingDot} />
                                <span className={style.typingDot} />
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Error banner */}
                {errorBanner && (
                    <div className={style.errorBanner}>
                        {errorBanner}
                        <button onClick={() => setErrorBanner(null)} className={style.errorClose}>✕</button>
                    </div>
                )}

                {/* Input row */}
                <div className={style.inputRow}>
                    <textarea
                        ref={inputRef}
                        className={style.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="말씀이나 기도에 대해 나눠보세요... (Enter로 전송)"
                        maxLength={1000}
                        rows={2}
                        disabled={loading}
                    />
                    <button
                        className={style.sendButton}
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        aria-label="전송"
                    >
                        <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>

                <div className={style.charCount}>{input.length} / 1000</div>
            </div>
        </>
    );
}
