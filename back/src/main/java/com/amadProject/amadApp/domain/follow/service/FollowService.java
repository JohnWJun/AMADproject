package com.amadProject.amadApp.domain.follow.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.follow.entity.Follow;
import com.amadProject.amadApp.domain.follow.repository.FollowRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public void follow(long followerId, long followingId) {
        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_EXISTS);
        }
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(following);
        followRepository.save(follow);
    }

    public void unfollow(long followerId, long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));
        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    public boolean isFollowing(long followerId, long followingId) {
        return followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
    }

    @Transactional(readOnly = true)
    public long getFollowerCount(long memberId) {
        return followRepository.countByFollowingId(memberId);
    }

    @Transactional(readOnly = true)
    public long getFollowingCount(long memberId) {
        return followRepository.countByFollowerId(memberId);
    }

    @Transactional(readOnly = true)
    public List<Member> getFollowings(long memberId) {
        return followRepository.findFollowingMembersByFollowerId(memberId);
    }
}
