package com.amadProject.amadApp.domain.group.repository;

import com.amadProject.amadApp.domain.group.entity.GroupMember;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    Optional<GroupMember> findByStudyGroupIdAndMemberId(Long groupId, Long memberId);

    boolean existsByStudyGroupIdAndMemberId(Long groupId, Long memberId);

    List<GroupMember> findAllByMemberIdAndStatus(Long memberId, MemberStatus status);

    List<GroupMember> findAllByStudyGroupIdAndStatus(Long groupId, MemberStatus status);

    List<GroupMember> findAllByStudyGroupId(Long groupId);

    int countByStudyGroupIdAndStatus(Long groupId, MemberStatus status);
}
