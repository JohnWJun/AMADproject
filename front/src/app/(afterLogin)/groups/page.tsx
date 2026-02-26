"use client";

import style from './groups.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createGroup, getMyGroups } from '@/app/(afterLogin)/_lib/GroupApi';

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

export default function GroupsPage() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const loadGroups = async () => {
        const accessToken = localStorage.getItem('Authorization') || '';
        const refreshToken = localStorage.getItem('Refresh') || '';
        const result = await getMyGroups({ accessToken, refreshToken });
        if (result.success && result.data) {
            setGroups(result.data as Group[]);
        }
    };

    useEffect(() => {
        loadGroups();
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        const accessToken = localStorage.getItem('Authorization') || '';
        const refreshToken = localStorage.getItem('Refresh') || '';
        const result = await createGroup({ name, description, accessToken, refreshToken });
        if (result.success) {
            setName('');
            setDescription('');
            await loadGroups();
        }
        setLoading(false);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>그룹</div>

            <div className={style.createForm}>
                <h3>새 그룹 만들기</h3>
                <form onSubmit={onSubmit}>
                    <input
                        className={style.input}
                        placeholder="그룹 이름"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        className={style.textarea}
                        placeholder="그룹 설명 (선택)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={style.submitButton}
                        disabled={!name.trim() || loading}
                    >
                        {loading ? '생성 중...' : '그룹 만들기'}
                    </button>
                </form>
            </div>

            <div className={style.groupList}>
                {groups.length === 0 ? (
                    <div className={style.emptyState}>참여 중인 그룹이 없습니다.</div>
                ) : (
                    groups.map(group => (
                        <Link key={group.id} href={`/groups/${group.id}`} className={style.groupCard}>
                            <div className={style.groupName}>{group.name}</div>
                            {group.description && (
                                <div className={style.groupDesc}>{group.description}</div>
                            )}
                            <div className={style.groupMeta}>
                                멤버 {group.memberCount}명 · {group.myRole === 'ADMIN' ? '관리자' : '멤버'}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
