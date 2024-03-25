package com.amadProject.amadApp.domain.member.mapper;

import com.amadProject.amadApp.domain.member.dto.MemberDto;
import com.amadProject.amadApp.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member patchToMember(MemberDto.Patch patch);
    Member memberPostToMember(MemberDto.Post post);
    MemberDto.Response memeberToMemberResponse(Member member);

    default MemberDto.ResponsesPage membersToMemberResponsePage(List<Member> members, int totalPage){
        MemberDto.ResponsesPage responsesPage = new MemberDto.ResponsesPage();
        responsesPage.setMembers(members.stream().map(
                member -> {
                    MemberDto.Response response = memeberToMemberResponse(member);
                    return response;
                }
        ).collect(Collectors.toList()));
        responsesPage.setTotalPage(totalPage);
        return responsesPage;
    };

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
