package com.amadProject.amadApp.domain.group.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.group.entity.GroupMember;
import com.amadProject.amadApp.domain.group.entity.StudyGroup;
import com.amadProject.amadApp.domain.group.entity.enums.GroupRole;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class GroupServiceTest {

    @Autowired
    private GroupService groupService;

    @Autowired
    private MemberRepository memberRepository;

    private Member creator;
    private Member member2;

    @BeforeEach
    void setUp() {
        creator = new Member();
        creator.setEmail("creator@test.com");
        creator.setNickname("creator");
        memberRepository.save(creator);

        member2 = new Member();
        member2.setEmail("member2@test.com");
        member2.setNickname("member2");
        memberRepository.save(member2);
    }

    @Test
    void createGroup_success() {
        StudyGroup group = groupService.createGroup("Test Group", "Description", creator.getEmail());

        assertThat(group).isNotNull();
        assertThat(group.getName()).isEqualTo("Test Group");
        assertThat(group.getCreator().getEmail()).isEqualTo(creator.getEmail());

        GroupMember membership = groupService.getViewerMembership(group.getId(), creator.getEmail());
        assertThat(membership).isNotNull();
        assertThat(membership.getRole()).isEqualTo(GroupRole.ADMIN);
        assertThat(membership.getStatus()).isEqualTo(MemberStatus.APPROVED);
    }

    @Test
    void requestJoin_success() {
        StudyGroup group = groupService.createGroup("Test Group", "Desc", creator.getEmail());

        GroupMember pending = groupService.requestJoin(group.getId(), member2.getEmail());

        assertThat(pending.getStatus()).isEqualTo(MemberStatus.PENDING);
        assertThat(pending.getRole()).isEqualTo(GroupRole.MEMBER);
        assertThat(pending.getMember().getEmail()).isEqualTo(member2.getEmail());
    }

    @Test
    void requestJoin_duplicate_throws409() {
        StudyGroup group = groupService.createGroup("Test Group", "Desc", creator.getEmail());
        groupService.requestJoin(group.getId(), member2.getEmail());

        assertThatThrownBy(() -> groupService.requestJoin(group.getId(), member2.getEmail()))
                .isInstanceOf(BusinessLogicException.class)
                .satisfies(ex -> assertThat(((BusinessLogicException) ex).getExceptionCode())
                        .isEqualTo(ExceptionCode.MEMBER_ALREADY_IN_GROUP));
    }

    @Test
    void approveRequest_success() {
        StudyGroup group = groupService.createGroup("Test Group", "Desc", creator.getEmail());
        groupService.requestJoin(group.getId(), member2.getEmail());

        GroupMember approved = groupService.approveRequest(group.getId(), creator.getEmail(), member2.getId());

        assertThat(approved.getStatus()).isEqualTo(MemberStatus.APPROVED);
    }

    @Test
    void approveRequest_byNonAdmin_throws403() {
        StudyGroup group = groupService.createGroup("Test Group", "Desc", creator.getEmail());
        groupService.requestJoin(group.getId(), member2.getEmail());

        Member member3 = new Member();
        member3.setEmail("member3@test.com");
        member3.setNickname("member3");
        memberRepository.save(member3);
        groupService.inviteMember(group.getId(), creator.getEmail(), member3.getEmail());

        assertThatThrownBy(() -> groupService.approveRequest(group.getId(), member3.getEmail(), member2.getId()))
                .isInstanceOf(BusinessLogicException.class)
                .satisfies(ex -> assertThat(((BusinessLogicException) ex).getExceptionCode())
                        .isEqualTo(ExceptionCode.NOT_GROUP_ADMIN));
    }

    @Test
    void getGroupFeed_onlyReturnsApprovedMemberships() {
        StudyGroup group1 = groupService.createGroup("Group1", "Desc1", creator.getEmail());
        StudyGroup group2 = groupService.createGroup("Group2", "Desc2", creator.getEmail());

        // member2 joins group1 and gets approved
        groupService.requestJoin(group1.getId(), member2.getEmail());
        groupService.approveRequest(group1.getId(), creator.getEmail(), member2.getId());

        // member2 is NOT in group2 (only requests join with pending)
        groupService.requestJoin(group2.getId(), member2.getEmail());

        List<GroupMember> myGroups = groupService.getMyGroups(member2.getEmail());

        // member2 should only see group1 (APPROVED), not group2 (PENDING)
        assertThat(myGroups).hasSize(1);
        assertThat(myGroups.get(0).getStudyGroup().getId()).isEqualTo(group1.getId());
    }

    @Test
    void removeMember_selfLeave_success() {
        StudyGroup group = groupService.createGroup("Test Group", "Desc", creator.getEmail());
        groupService.inviteMember(group.getId(), creator.getEmail(), member2.getEmail());

        groupService.removeMember(group.getId(), member2.getEmail(), member2.getId());

        GroupMember membership = groupService.getViewerMembership(group.getId(), member2.getEmail());
        assertThat(membership).isNull();
    }
}
