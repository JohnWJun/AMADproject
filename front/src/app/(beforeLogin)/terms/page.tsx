import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "이용약관 | AMAD",
};

export default function TermsPage() {
    return (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px", fontFamily: "inherit", color: "#111827", lineHeight: "1.8" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: 8 }}>이용약관</h1>
            <p style={{ color: "#6b7280", marginBottom: 32 }}>최종 업데이트: 2026년 2월</p>

            <p>
                이 이용약관(이하 &ldquo;약관&rdquo;)은 AMAD(이하 &ldquo;회사&rdquo;)가 제공하는 서비스(이하 &ldquo;서비스&rdquo;)의 이용에 관한 조건 및 절차,
                회사와 이용자 간의 권리·의무 관계를 규정합니다.
            </p>

            <hr style={{ margin: "32px 0", borderColor: "#e5e7eb" }} />

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제1조 (서비스 소개 및 목적)
                </h2>
                <p>
                    AMAD는 &ldquo;A Mission A Day — Your Daily Log with God&rdquo;를 모토로 운영되는 말씀 묵상 저널링 웹 서비스입니다.
                    이용자는 매일의 성경 묵상을 기록하고, 그룹으로 나누며, AI 상담(PathFinder)을 통해 신앙 성장을 돕는 서비스를
                    이용할 수 있습니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제2조 (회원 자격 및 가입)
                </h2>
                <ol>
                    <li>서비스는 Google 계정을 통한 OAuth2 로그인 방식으로 가입합니다.</li>
                    <li>만 14세 미만은 서비스를 이용할 수 없습니다.</li>
                    <li>회원은 자신의 계정 보안에 책임을 지며, 타인에게 계정을 양도하거나 공유할 수 없습니다.</li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제3조 (서비스 이용 규칙)
                </h2>
                <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
                <ul>
                    <li>타인의 개인정보 도용 또는 허위 정보 등록</li>
                    <li>서비스를 통한 불법 콘텐츠, 혐오 발언, 음란물 게시</li>
                    <li>서비스의 정상적 운영을 방해하는 기술적 행위</li>
                    <li>다른 이용자에 대한 괴롭힘, 스팸 행위</li>
                    <li>저작권, 상표권 등 제3자의 지적 재산권 침해</li>
                </ul>
                <p>규칙 위반 시 사전 통보 없이 이용 제한 또는 계정 삭제 조치가 취해질 수 있습니다.</p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제4조 (PathFinder AI 이용 조건 및 면책)
                </h2>
                <ol>
                    <li>
                        PathFinder는 AI(OpenAI API)를 활용한 성경 상담 서비스로, 이용을 위해서는
                        해외 개인정보 이전 등에 대한 별도 동의가 필요합니다.
                    </li>
                    <li>
                        PathFinder는 전문적인 심리 상담, 의료 상담, 법적 조언을 대체하지 않습니다.
                        긴급한 심리적 위기 상황에서는 전문 기관(자살예방상담전화 1393, 정신건강 위기상담전화 1577-0199)에
                        연락하시기 바랍니다.
                    </li>
                    <li>
                        AI의 응답은 정보 제공 목적이며, 그 정확성을 보장하지 않습니다.
                        이용자는 AI 응답을 그대로 신뢰하기보다 신중하게 판단하여 활용해야 합니다.
                    </li>
                    <li>
                        무료 이용자는 하루 3회, 유료(PREMIUM) 이용자는 하루 10회까지 이용할 수 있으며,
                        이용 한도는 사전 고지 후 변경될 수 있습니다.
                    </li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제5조 (구독 및 결제)
                </h2>
                <ol>
                    <li>
                        PREMIUM 구독은 월 $5(USD)이며, 매월 자동 갱신됩니다.
                        결제는 Stripe를 통해 처리되며, 회사는 신용카드 전체 번호를 저장하지 않습니다.
                    </li>
                    <li>
                        구독 취소는 이용자가 언제든지 서비스 내에서 할 수 있으며, 취소 후에는 당월
                        결제 주기가 끝날 때까지 PREMIUM 기능을 이용할 수 있습니다.
                    </li>
                    <li>
                        법령 및 회사 정책에서 달리 정하지 않는 한, 이미 결제된 구독 요금은 환불되지 않습니다.
                    </li>
                    <li>구독 요금은 사전 공지(30일 전) 후 변경될 수 있습니다.</li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제6조 (계정 해지 및 데이터 삭제)
                </h2>
                <ol>
                    <li>
                        이용자는 언제든지 서비스 내 계정 삭제 기능을 통해 탈퇴할 수 있습니다.
                    </li>
                    <li>
                        탈퇴 즉시 모든 개인정보 및 게시물 데이터가 삭제됩니다.
                        단, 법령에 따라 보관이 필요한 거래 기록은 해당 기간 동안 보관됩니다.
                    </li>
                    <li>
                        회사는 약관 위반 또는 서비스 부정 이용 시 이용자에게 사전 통보 후 또는 긴급 시
                        사전 통보 없이 계정을 해지할 수 있습니다.
                    </li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제7조 (지적 재산권)
                </h2>
                <ol>
                    <li>서비스의 UI, 디자인, 로고, 소프트웨어에 관한 지적 재산권은 회사에 귀속됩니다.</li>
                    <li>
                        이용자가 서비스에 게시한 콘텐츠(묵상 게시물, AI 대화 등)의 저작권은 이용자에게
                        귀속됩니다. 다만, 이용자는 회사가 서비스 운영을 위해 해당 콘텐츠를 사용할 수 있는
                        비독점적 권리를 회사에 부여합니다.
                    </li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제8조 (책임의 한계)
                </h2>
                <ol>
                    <li>회사는 서비스의 무중단을 보장하지 않으며, 불가피한 중단 시 사전 공지를 원칙으로 합니다.</li>
                    <li>
                        회사는 이용자가 서비스 내에 게시한 콘텐츠의 정확성, 완전성, 합법성에 대해 책임을 지지 않습니다.
                    </li>
                    <li>회사의 귀책 사유 없이 발생한 손해에 대해서는 책임을 지지 않습니다.</li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제9조 (분쟁 해결 및 준거법)
                </h2>
                <ol>
                    <li>이 약관은 대한민국 법률에 따라 해석되고 적용됩니다.</li>
                    <li>
                        서비스 이용으로 발생한 분쟁은 회사와 이용자가 성실히 협의하여 해결합니다.
                        협의가 이루어지지 않을 경우, 민사소송법에 따른 관할 법원을 제1심 관할로 합니다.
                    </li>
                </ol>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    제10조 (약관의 변경)
                </h2>
                <p>
                    회사는 관련 법령이나 서비스 변경에 따라 약관을 개정할 수 있습니다.
                    중요한 변경 사항은 시행 7일 전(이용자에게 불리한 변경의 경우 30일 전) 서비스 내 공지합니다.
                    공지 기간 내에 거부 의사를 표시하지 않으면 변경 약관에 동의한 것으로 봅니다.
                </p>
            </section>

            <p style={{ marginTop: 40, color: "#9ca3af", fontSize: "0.83rem" }}>
                본 약관은 2026년 2월 1일부터 적용됩니다.
            </p>
        </div>
    );
}
