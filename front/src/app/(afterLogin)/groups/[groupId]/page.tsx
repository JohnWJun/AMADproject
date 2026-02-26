"use client";

import style from './group.module.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PostAbstract from '@/app/(afterLogin)/_component/PostAbstract';
import {
    getGroupDetail,
    getGroupMembers,
    getGroupPosts,
    getPendingRequests,
    requestJoin,
    approveRequest,
    inviteMember,
} from '@/app/(afterLogin)/_lib/GroupApi';
import { getPostTdyDetail } from '@/app/(afterLogin)/_lib/PostApi';
import { useRecoilValue } from 'recoil';
import { Member } from '@/app/_component/MemberRecoilState';

type Group = {
    id: number;
    name: string;
    description: string;
    creatorEmail: string;
    creatorNickname: string;
    memberCount: number;
    myRole: string | null;
    myStatus: string | null;
};

type GroupMemberInfo = {
    memberId: number;
    nickname: string;
    email: string;
    statusImg: string;
    role: string;
    status: string;
};

type Post = {
    id: bigint;
    title: string;
    writer: string;
    nickname: string;
    statusImg: string;
    createdAt: string;
    content_1: string;
    myAmad: string;
    likes: number;
    commentsNum: number;
    whoLikesMyPost: BigInt[];
    groupId?: number;
    groupName?: string;
};

type Tab = '피드' | '멤버' | '관리';

export default function GroupDetailPage({ params }: { params: { groupId: string } }) {
    const { groupId } = params;
    const memberInfo = useRecoilValue(Member);
    const [group, setGroup] = useState<Group | null>(null);
    const [hasTodayPost, setHasTodayPost] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('피드');
    const [posts, setPosts] = useState<Post[]>([]);
    const [members, setMembers] = useState<GroupMemberInfo[]>([]);
    const [pendingRequests, setPendingRequests] = useState<GroupMemberInfo[]>([]);
    const [page, setPage] = useState(1);
    const [isLastPost, setIsLastPost] = useState(false);
    const [joinRequested, setJoinRequested] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const sentinelRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);

    const getTokens = () => ({
        accessToken: localStorage.getItem('Authorization') || '',
        refreshToken: localStorage.getItem('Refresh') || '',
    });

    const loadGroup = async () => {
        const { accessToken, refreshToken } = getTokens();
        const result = await getGroupDetail({ groupId, accessToken, refreshToken });
        if (result.success && result.data) {
            setGroup(result.data as Group);
        }
    };

    useEffect(() => {
        loadGroup();
    }, [groupId]);

    useEffect(() => {
        if (!memberInfo?.id) return;
        const checkTodayPost = async () => {
            const { accessToken, refreshToken } = getTokens();
            const result = await getPostTdyDetail({ accessToken, refreshToken, memberId: memberInfo.id });
            setHasTodayPost(result.success);
        };
        checkTodayPost();
    }, [memberInfo?.id]);

    // Load feed posts with infinite scroll
    useEffect(() => {
        if (activeTab !== '피드') return;
        if (!group?.myStatus || group.myStatus !== 'APPROVED') return;
        if (isLastPost) return;

        let cancelled = false;
        isLoadingRef.current = true;

        const doFetch = async () => {
            const { accessToken, refreshToken } = getTokens();
            const result = await getGroupPosts({ groupId, page, accessToken, refreshToken });
            if (cancelled) return;
            if (result.success && result.data) {
                const newPosts = result.data.posts as Post[];
                setPosts(prev => [...prev, ...newPosts]);
                if (newPosts.length < 3) setIsLastPost(true);
            } else {
                setIsLastPost(true);
            }
            isLoadingRef.current = false;
        };

        doFetch();
        return () => { cancelled = true; };
    }, [page, activeTab, group]);

    // Infinite scroll observer
    useEffect(() => {
        if (activeTab !== '피드') return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoadingRef.current && !isLastPost) {
                setPage(prev => prev + 1);
            }
        }, { threshold: 0.5 });

        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => { if (sentinelRef.current) observer.unobserve(sentinelRef.current); };
    }, [activeTab, isLastPost]);

    const loadMembers = async () => {
        const { accessToken, refreshToken } = getTokens();
        const result = await getGroupMembers({ groupId, accessToken, refreshToken });
        if (result.success && result.data) {
            setMembers(result.data as GroupMemberInfo[]);
        }
    };

    const loadPending = async () => {
        const { accessToken, refreshToken } = getTokens();
        const result = await getPendingRequests({ groupId, accessToken, refreshToken });
        if (result.success && result.data) {
            setPendingRequests(result.data as GroupMemberInfo[]);
        }
    };

    const onTabChange = (tab: Tab) => {
        setActiveTab(tab);
        if (tab === '멤버') loadMembers();
        if (tab === '관리') { loadPending(); }
    };

    const onJoin = async () => {
        const { accessToken, refreshToken } = getTokens();
        const result = await requestJoin({ groupId, accessToken, refreshToken });
        if (result.success) {
            setJoinRequested(true);
            await loadGroup();
        }
    };

    const onApprove = async (memberId: number) => {
        const { accessToken, refreshToken } = getTokens();
        const result = await approveRequest({ groupId, memberId, accessToken, refreshToken });
        if (result.success) {
            await loadPending();
        }
    };

    const onInvite = async () => {
        if (!inviteEmail.trim()) return;
        const { accessToken, refreshToken } = getTokens();
        const result = await inviteMember({ groupId, targetEmail: inviteEmail, accessToken, refreshToken });
        if (result.success) {
            setInviteEmail('');
        }
    };

    if (!group) return <div style={{ padding: 16 }}>로딩 중...</div>;

    const isApprovedMember = group.myStatus === 'APPROVED';
    const isAdmin = group.myRole === 'ADMIN';

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.groupName}>{group.name}</div>
                {group.description && <div className={style.groupDesc}>{group.description}</div>}
                <div className={style.groupMeta}>
                    멤버 {group.memberCount}명 · 개설자: {group.creatorNickname}
                </div>
                <div className={style.headerActions}>
                    {isApprovedMember ? (
                        hasTodayPost ? (
                            <span className={style.pendingBadge}>오늘 묵상을 이미 작성했습니다</span>
                        ) : (
                            <Link
                                href={`/compose/amad?groupId=${group.id}`}
                                className={style.composeButton}
                            >
                                글 작성
                            </Link>
                        )
                    ) : group.myStatus === 'PENDING' ? (
                        <span className={style.pendingBadge}>가입 신청 중</span>
                    ) : (
                        <button className={style.joinButton} onClick={onJoin}>
                            가입 신청
                        </button>
                    )}
                </div>
            </div>

            <div className={style.tabs}>
                {(['피드', '멤버', ...(isAdmin ? ['관리'] : [])] as Tab[]).map(tab => (
                    <div
                        key={tab}
                        className={`${style.tab} ${activeTab === tab ? style.tabActive : ''}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {activeTab === '피드' && (
                <div className={style.feed}>
                    {!isApprovedMember ? (
                        <div className={style.emptyState}>
                            그룹 멤버만 피드를 볼 수 있습니다.
                        </div>
                    ) : posts.length === 0 ? (
                        <div className={style.emptyState}>아직 게시물이 없습니다.</div>
                    ) : (
                        <>
                            {posts.map((post, i) => (
                                <PostAbstract key={i} post={post} />
                            ))}
                            <div ref={sentinelRef} style={{ height: 1 }} />
                        </>
                    )}
                </div>
            )}

            {activeTab === '멤버' && (
                <div className={style.memberList}>
                    {members.length === 0 ? (
                        <div className={style.emptyState}>멤버가 없습니다.</div>
                    ) : (
                        members.map(m => (
                            <div key={m.memberId} className={style.memberItem}>
                                {m.statusImg ? (
                                    <img src={m.statusImg} alt={m.nickname} className={style.memberAvatar} />
                                ) : (
                                    <div className={style.memberAvatarPlaceholder}>
                                        {m.nickname[0]}
                                    </div>
                                )}
                                <div className={style.memberInfo}>
                                    <div className={style.memberNickname}>{m.nickname}</div>
                                    <div className={style.memberEmail}>{m.email}</div>
                                </div>
                                <span className={`${style.roleBadge} ${m.role === 'ADMIN' ? style.roleBadgeAdmin : ''}`}>
                                    {m.role === 'ADMIN' ? '관리자' : '멤버'}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === '관리' && isAdmin && (
                <div className={style.adminPanel}>
                    <div className={style.adminSection}>
                        <h4>가입 신청 ({pendingRequests.length})</h4>
                        {pendingRequests.length === 0 ? (
                            <div className={style.emptyState}>대기 중인 신청이 없습니다.</div>
                        ) : (
                            pendingRequests.map(req => (
                                <div key={req.memberId} className={style.pendingItem}>
                                    <div className={style.memberInfo}>
                                        <div className={style.memberNickname}>{req.nickname}</div>
                                        <div className={style.memberEmail}>{req.email}</div>
                                    </div>
                                    <div className={style.pendingActions}>
                                        <button
                                            className={style.approveButton}
                                            onClick={() => onApprove(req.memberId)}
                                        >
                                            승인
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className={style.adminSection}>
                        <h4>멤버 초대 (이메일로 초대)</h4>
                        <div className={style.inviteSection}>
                            <input
                                className={style.inviteInput}
                                placeholder="이메일 주소 입력"
                                value={inviteEmail}
                                onChange={e => setInviteEmail(e.target.value)}
                                type="email"
                            />
                            <button className={style.inviteButton} onClick={onInvite}>
                                초대하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
