"use client";

import { useState } from "react";
import style from "./pathFinderConsent.module.css";

interface Props {
    onConfirm: () => void;
    onClose: () => void;
}

export default function PathFinderConsentModal({ onConfirm, onClose }: Props) {
    const [checked, setChecked] = useState(false);

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.card} onClick={(e) => e.stopPropagation()}>
                <div className={style.cardHeader}>
                    <h2 className={style.title}>PathFinder 이용 동의</h2>
                    <button className={style.closeBtn} onClick={onClose} aria-label="닫기">✕</button>
                </div>

                <div className={style.body}>
                    <section className={style.section}>
                        <h3>서비스 소개</h3>
                        <p>
                            PathFinder는 AMAD가 제공하는 AI 성경 상담 서비스입니다.
                            말씀 묵상과 기도에 관한 질문에 AI가 응답합니다.
                        </p>
                    </section>

                    <section className={style.section}>
                        <h3>수집 및 이용 정보</h3>
                        <p>이용 과정에서 다음 정보가 처리됩니다.</p>
                        <ul>
                            <li>대화 내용 (질문 및 AI 응답)</li>
                            <li>일일 이용 횟수</li>
                        </ul>
                        <p>수집된 정보는 서비스 제공 목적으로만 이용됩니다.</p>
                    </section>

                    <section className={`${style.section} ${style.highlightSection}`}>
                        <h3>⚠️ 해외 개인정보 이전 고지 (개인정보보호법 제39조의12)</h3>
                        <p>
                            AI 응답 생성을 위해 귀하의 대화 내용이 <strong>OpenAI LLC (미국)</strong>의 API 서버로
                            전송됩니다. OpenAI는 당사의 요청에 따라 AI 모델의 재학습에 이용자의 입력 데이터를
                            사용하지 않으며, 전송된 데이터는 응답 생성 후 보관되지 않습니다.
                        </p>
                        <ul>
                            <li><strong>이전 국가:</strong> 미국</li>
                            <li><strong>이전 받는 자:</strong> OpenAI LLC</li>
                            <li><strong>이전 목적:</strong> AI 응답 생성</li>
                            <li><strong>재학습 여부:</strong> 없음</li>
                        </ul>
                    </section>

                    <section className={`${style.section} ${style.disclaimerSection}`}>
                        <h3>📌 AI 상담 면책 공지</h3>
                        <p>
                            PathFinder는 AI 기반 서비스로, 전문적인 심리 상담 또는 의료 상담을
                            대체하지 않습니다. 심리적 어려움이나 정신건강 문제는 전문 상담사나
                            의료진의 도움을 받으시기 바랍니다.
                        </p>
                    </section>

                    <section className={`${style.section} ${style.crisisSection}`}>
                        <h3>🆘 위기 상황 안내</h3>
                        <p>스스로를 해치고 싶다는 생각이 든다면 즉시 아래에 연락하세요.</p>
                        <ul>
                            <li><strong>자살예방상담전화:</strong> 1393 (24시간)</li>
                            <li><strong>정신건강 위기상담전화:</strong> 1577-0199 (24시간)</li>
                        </ul>
                    </section>
                </div>

                <div className={style.footer}>
                    <label className={style.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span>위 내용을 모두 확인하였으며 동의합니다.</span>
                    </label>
                    <div className={style.footerLinks}>
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>
                        <span> · </span>
                        <a href="/terms" target="_blank" rel="noopener noreferrer">이용약관</a>
                    </div>
                    <button
                        className={style.confirmBtn}
                        disabled={!checked}
                        onClick={onConfirm}
                    >
                        동의하고 시작하기
                    </button>
                </div>
            </div>
        </div>
    );
}
