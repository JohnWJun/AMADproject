import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보처리방침 | AMAD",
};

export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px", fontFamily: "inherit", color: "#111827", lineHeight: "1.8" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: 8 }}>개인정보처리방침</h1>
            <p style={{ color: "#6b7280", marginBottom: 32 }}>최종 업데이트: 2026년 2월</p>

            <p>
                AMAD (이하 "회사")는 이용자의 개인정보를 소중하게 생각하며, 개인정보보호법 등 관련 법령을 준수합니다.
                이 방침은 회사가 운영하는 서비스에서 수집·이용하는 개인정보에 관한 사항을 안내합니다.
            </p>

            <hr style={{ margin: "32px 0", borderColor: "#e5e7eb" }} />

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    1. 개인정보의 처리 목적
                </h2>
                <p>회사는 다음 목적을 위해 개인정보를 처리합니다.</p>
                <ul>
                    <li>회원 가입 및 본인 확인</li>
                    <li>서비스(말씀 묵상 기록, 그룹, PathFinder AI 상담) 제공</li>
                    <li>구독 결제 및 이용 관리</li>
                    <li>서비스 개선 및 신규 서비스 개발</li>
                    <li>법령 준수 및 분쟁 해결</li>
                </ul>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    2. 처리하는 개인정보 항목
                </h2>
                <ul>
                    <li><strong>필수:</strong> 이메일 주소, 닉네임, 프로필 이미지 (Google 로그인을 통해 제공)</li>
                    <li><strong>서비스 이용 중 생성:</strong> 말씀 묵상 게시물 내용, AI(PathFinder) 대화 내용, 일일 이용 횟수</li>
                    <li><strong>결제 정보:</strong> Stripe가 처리하며 회사는 카드 전체 번호를 저장하지 않습니다.</li>
                    <li><strong>자동 수집:</strong> 서비스 이용 기록, IP 주소 (보안 목적)</li>
                </ul>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    3. 개인정보의 처리 및 보유기간
                </h2>
                <p>
                    개인정보는 회원 탈퇴 시 지체 없이 파기합니다. 단, 관련 법령에 따라 보관이 필요한 경우
                    해당 기간 동안 보관합니다.
                </p>
                <ul>
                    <li>전자상거래 관련 기록: 5년 (전자상거래법)</li>
                    <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
                    <li>로그인 기록: 3개월 (통신비밀보호법)</li>
                </ul>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    4. 개인정보의 제3자 제공
                </h2>
                <p>
                    회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
                    다만, 이용자의 별도 동의가 있거나 법령에 의한 경우는 예외입니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    5. 개인정보 처리 위탁
                </h2>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", marginTop: 8 }}>
                    <thead>
                        <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                            <th style={{ textAlign: "left", padding: "10px 12px" }}>수탁 업체</th>
                            <th style={{ textAlign: "left", padding: "10px 12px" }}>위탁 업무</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>OpenAI LLC (미국)</td>
                            <td style={{ padding: "10px 12px" }}>PathFinder AI 응답 생성</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>Stripe Inc. (미국)</td>
                            <td style={{ padding: "10px 12px" }}>구독 결제 처리</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "10px 12px" }}>클라우드 호스팅 업체</td>
                            <td style={{ padding: "10px 12px" }}>서버 운영 및 데이터 보관</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    6. 개인정보의 국외 이전 (개인정보보호법 제39조의12)
                </h2>
                <p>회사는 PathFinder AI 서비스 제공을 위해 아래와 같이 개인정보를 국외로 이전합니다.</p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", marginTop: 8 }}>
                    <thead>
                        <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                            <th style={{ textAlign: "left", padding: "10px 12px" }}>항목</th>
                            <th style={{ textAlign: "left", padding: "10px 12px" }}>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>이전 받는 자</td>
                            <td style={{ padding: "10px 12px" }}>OpenAI LLC</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>이전 국가</td>
                            <td style={{ padding: "10px 12px" }}>미국</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>이전 목적</td>
                            <td style={{ padding: "10px 12px" }}>AI 응답 생성 (PathFinder 서비스)</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>이전 항목</td>
                            <td style={{ padding: "10px 12px" }}>AI와 나눈 대화 내용</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={{ padding: "10px 12px" }}>보유 및 이용기간</td>
                            <td style={{ padding: "10px 12px" }}>응답 생성 후 OpenAI 서버에 저장되지 않음</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "10px 12px" }}>재학습 여부</td>
                            <td style={{ padding: "10px 12px" }}>없음 (Zero Data Retention 정책 적용)</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ marginTop: 12, color: "#6b7280", fontSize: "0.87rem" }}>
                    * 이전에 동의하지 않으실 경우 PathFinder AI 기능을 이용하실 수 없습니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    7. 정보주체의 권리·의무 및 행사 방법
                </h2>
                <p>이용자는 다음의 권리를 행사할 수 있습니다.</p>
                <ul>
                    <li>개인정보 열람 요구</li>
                    <li>개인정보 정정·삭제 요구</li>
                    <li>개인정보 처리정지 요구</li>
                    <li>자동화된 결정에 대한 거부</li>
                </ul>
                <p>
                    권리 행사는 서비스 내 설정 또는 아래 개인정보 보호책임자에게 이메일로 요청하실 수 있습니다.
                    요청 접수 후 10일 이내에 처리 결과를 안내드립니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    8. 개인정보의 파기 절차 및 방법
                </h2>
                <p>
                    회원 탈퇴 또는 보유기간 만료 시, 개인정보는 즉시 파기됩니다.
                    전자적 파일은 복구 불가능한 방법으로 삭제하며, 종이 출력물은 해당하지 않습니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    9. 개인정보 보호책임자
                </h2>
                <p>
                    개인정보 처리에 관한 문의·불만은 아래 책임자에게 연락하시기 바랍니다.
                </p>
                <ul>
                    <li><strong>담당:</strong> AMAD 개인정보 보호팀</li>
                    <li><strong>연락처:</strong> admin@jxy.me</li>
                </ul>
                <p>
                    개인정보 침해 신고·상담은 개인정보보호위원회(privacy.go.kr, 국번 없이 182) 또는
                    한국인터넷진흥원(118)에 문의하실 수 있습니다.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 28, marginBottom: 12 }}>
                    10. 개인정보처리방침의 변경
                </h2>
                <p>
                    이 방침은 법령 변경 또는 서비스 변경에 따라 개정될 수 있습니다.
                    변경 시 서비스 내 공지 또는 이메일을 통해 사전 안내합니다.
                    변경된 방침은 공지 후 7일이 지난 시점부터 효력이 발생합니다.
                </p>
            </section>

            <p style={{ marginTop: 40, color: "#9ca3af", fontSize: "0.83rem" }}>
                본 방침은 2026년 2월 1일부터 적용됩니다.
            </p>
        </div>
    );
}
