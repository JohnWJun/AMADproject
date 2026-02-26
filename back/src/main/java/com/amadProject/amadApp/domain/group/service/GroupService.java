package com.amadProject.amadApp.domain.group.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.group.entity.GroupMember;
import com.amadProject.amadApp.domain.group.entity.StudyGroup;
import com.amadProject.amadApp.domain.group.entity.enums.GroupRole;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import com.amadProject.amadApp.domain.group.repository.GroupMemberRepository;
import com.amadProject.amadApp.domain.group.repository.StudyGroupRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final MemberRepository memberRepository;

    public StudyGroup createGroup(String name, String description, String email) {
        Member creator = findMemberByEmail(email);

        StudyGroup group = new StudyGroup();
        group.setName(name);
        group.setDescription(description);
        group.setCreator(creator);
        StudyGroup savedGroup = studyGroupRepository.save(group);

        GroupMember groupMember = new GroupMember();
        groupMember.setStudyGroup(savedGroup);
        groupMember.setMember(creator);
        groupMember.setRole(GroupRole.ADMIN);
        groupMember.setStatus(MemberStatus.APPROVED);
        groupMemberRepository.save(groupMember);

        return savedGroup;
    }

    public GroupMember requestJoin(Long groupId, String email) {
        Member member = findMemberByEmail(email);
        StudyGroup group = findGroupById(groupId);

        if (groupMemberRepository.existsByStudyGroupIdAndMemberId(groupId, member.getId())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_IN_GROUP);
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setStudyGroup(group);
        groupMember.setMember(member);
        groupMember.setRole(GroupRole.MEMBER);
        groupMember.setStatus(MemberStatus.PENDING);
        return groupMemberRepository.save(groupMember);
    }

    public GroupMember inviteMember(Long groupId, String adminEmail, String targetEmail) {
        verifyAdmin(groupId, adminEmail);
        Member target = memberRepository.findByEmail(targetEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        StudyGroup group = findGroupById(groupId);

        if (groupMemberRepository.existsByStudyGroupIdAndMemberId(groupId, target.getId())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_IN_GROUP);
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setStudyGroup(group);
        groupMember.setMember(target);
        groupMember.setRole(GroupRole.MEMBER);
        groupMember.setStatus(MemberStatus.APPROVED);
        return groupMemberRepository.save(groupMember);
    }

    public GroupMember approveRequest(Long groupId, String adminEmail, Long targetMemberId) {
        verifyAdmin(groupId, adminEmail);
        GroupMember gm = groupMemberRepository.findByStudyGroupIdAndMemberId(groupId, targetMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.JOIN_REQUEST_NOT_FOUND));
        gm.setStatus(MemberStatus.APPROVED);
        return groupMemberRepository.save(gm);
    }

    public void removeMember(Long groupId, String actorEmail, Long targetMemberId) {
        Member actor = findMemberByEmail(actorEmail);
        GroupMember actorMembership = groupMemberRepository
                .findByStudyGroupIdAndMemberId(groupId, actor.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_GROUP_MEMBER));

        boolean isAdmin = actorMembership.getRole() == GroupRole.ADMIN
                && actorMembership.getStatus() == MemberStatus.APPROVED;
        boolean isSelf = actor.getId().equals(targetMemberId);

        if (!isAdmin && !isSelf) {
            throw new BusinessLogicException(ExceptionCode.NOT_GROUP_ADMIN);
        }

        GroupMember toRemove = groupMemberRepository
                .findByStudyGroupIdAndMemberId(groupId, targetMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_GROUP_MEMBER));
        groupMemberRepository.delete(toRemove);
    }

    @Transactional(readOnly = true)
    public List<GroupMember> getMyGroups(String email) {
        Member member = findMemberByEmail(email);
        return groupMemberRepository.findAllByMemberIdAndStatus(member.getId(), MemberStatus.APPROVED);
    }

    @Transactional(readOnly = true)
    public StudyGroup getGroupDetail(Long groupId) {
        return findGroupById(groupId);
    }

    @Transactional(readOnly = true)
    public GroupMember getViewerMembership(Long groupId, String viewerEmail) {
        Member viewer = findMemberByEmail(viewerEmail);
        return groupMemberRepository.findByStudyGroupIdAndMemberId(groupId, viewer.getId()).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<GroupMember> getMembers(Long groupId, String viewerEmail) {
        Member viewer = findMemberByEmail(viewerEmail);
        groupMemberRepository.findByStudyGroupIdAndMemberId(groupId, viewer.getId())
                .filter(gm -> gm.getStatus() == MemberStatus.APPROVED)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_GROUP_MEMBER));
        return groupMemberRepository.findAllByStudyGroupId(groupId);
    }

    @Transactional(readOnly = true)
    public List<GroupMember> getPendingRequests(Long groupId, String adminEmail) {
        verifyAdmin(groupId, adminEmail);
        return groupMemberRepository.findAllByStudyGroupIdAndStatus(groupId, MemberStatus.PENDING);
    }

    public StudyGroup updateGroup(Long groupId, String adminEmail, String name, String description) {
        verifyAdmin(groupId, adminEmail);
        StudyGroup group = findGroupById(groupId);
        if (name != null) group.setName(name);
        if (description != null) group.setDescription(description);
        return studyGroupRepository.save(group);
    }

    public void deleteGroup(Long groupId, String adminEmail) {
        verifyAdmin(groupId, adminEmail);
        StudyGroup group = findGroupById(groupId);
        List<GroupMember> members = groupMemberRepository.findAllByStudyGroupId(groupId);
        groupMemberRepository.deleteAll(members);
        studyGroupRepository.delete(group);
    }

    @Transactional(readOnly = true)
    public int getMemberCount(Long groupId) {
        return groupMemberRepository.countByStudyGroupIdAndStatus(groupId, MemberStatus.APPROVED);
    }

    private void verifyAdmin(Long groupId, String email) {
        Member member = findMemberByEmail(email);
        GroupMember gm = groupMemberRepository.findByStudyGroupIdAndMemberId(groupId, member.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_GROUP_MEMBER));
        if (gm.getRole() != GroupRole.ADMIN || gm.getStatus() != MemberStatus.APPROVED) {
            throw new BusinessLogicException(ExceptionCode.NOT_GROUP_ADMIN);
        }
    }

    public Member getMemberByEmail(String email) {
        return findMemberByEmail(email);
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private StudyGroup findGroupById(Long groupId) {
        return studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));
    }
}
