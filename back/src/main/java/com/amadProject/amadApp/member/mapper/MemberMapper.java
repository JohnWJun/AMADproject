package com.amadProject.amadApp.member.mapper;

import com.amadProject.amadApp.member.dto.MemberDto;
import com.amadProject.amadApp.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberDto.Response memeberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
