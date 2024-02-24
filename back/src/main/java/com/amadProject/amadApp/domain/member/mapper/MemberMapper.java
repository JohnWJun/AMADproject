package com.amadProject.amadApp.domain.member.mapper;

import com.amadProject.amadApp.domain.member.dto.MemberDto;
import com.amadProject.amadApp.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member patchToMember(MemberDto.Patch patch);
    Member memberPostToMember(MemberDto.Post post);
    MemberDto.Response memeberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
