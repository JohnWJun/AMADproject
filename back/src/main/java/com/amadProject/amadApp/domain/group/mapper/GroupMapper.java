package com.amadProject.amadApp.domain.group.mapper;

import com.amadProject.amadApp.domain.group.dto.GroupDto;
import com.amadProject.amadApp.domain.group.entity.GroupMember;
import com.amadProject.amadApp.domain.group.entity.StudyGroup;
import com.amadProject.amadApp.domain.group.entity.enums.GroupRole;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    default GroupDto.Response studyGroupToResponse(StudyGroup group, int memberCount, GroupRole myRole, MemberStatus myStatus) {
        GroupDto.Response response = new GroupDto.Response();
        response.setId(group.getId());
        response.setName(group.getName());
        response.setDescription(group.getDescription());
        response.setCreatorEmail(group.getCreator().getEmail());
        response.setCreatorNickname(group.getCreator().getNickname());
        response.setMemberCount(memberCount);
        response.setMyRole(myRole);
        response.setMyStatus(myStatus);
        return response;
    }

    default GroupDto.MemberResponse groupMemberToMemberResponse(GroupMember groupMember) {
        GroupDto.MemberResponse response = new GroupDto.MemberResponse();
        response.setMemberId(groupMember.getMember().getId());
        response.setNickname(groupMember.getMember().getNickname());
        response.setEmail(groupMember.getMember().getEmail());
        response.setStatusImg(groupMember.getMember().getStatusImg());
        response.setRole(groupMember.getRole());
        response.setStatus(groupMember.getStatus());
        return response;
    }
}
