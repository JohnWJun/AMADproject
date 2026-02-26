package com.amadProject.amadApp.domain.group.controller;

import com.amadProject.amadApp.domain.group.dto.GroupDto;
import com.amadProject.amadApp.domain.group.entity.GroupMember;
import com.amadProject.amadApp.domain.group.entity.StudyGroup;
import com.amadProject.amadApp.domain.group.mapper.GroupMapper;
import com.amadProject.amadApp.domain.group.service.GroupService;
import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.mapper.PostMapper;
import com.amadProject.amadApp.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper groupMapper;
    private final PostService postService;
    private final PostMapper postMapper;

    private String getLoggedInEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping
    public ResponseEntity<GroupDto.Response> createGroup(@RequestBody GroupDto.Post requestBody) {
        String email = getLoggedInEmail();
        StudyGroup group = groupService.createGroup(requestBody.getName(), requestBody.getDescription(), email);
        int memberCount = groupService.getMemberCount(group.getId());
        GroupMember myMembership = groupService.getViewerMembership(group.getId(), email);
        GroupDto.Response response = groupMapper.studyGroupToResponse(
                group, memberCount,
                myMembership != null ? myMembership.getRole() : null,
                myMembership != null ? myMembership.getStatus() : null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/mine")
    public ResponseEntity<List<GroupDto.Response>> getMyGroups() {
        String email = getLoggedInEmail();
        List<GroupMember> myMemberships = groupService.getMyGroups(email);
        List<GroupDto.Response> responses = myMemberships.stream().map(gm -> {
            StudyGroup group = gm.getStudyGroup();
            int count = groupService.getMemberCount(group.getId());
            return groupMapper.studyGroupToResponse(group, count, gm.getRole(), gm.getStatus());
        }).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDto.Response> getGroupDetail(@PathVariable Long groupId) {
        String email = getLoggedInEmail();
        StudyGroup group = groupService.getGroupDetail(groupId);
        int memberCount = groupService.getMemberCount(groupId);
        GroupMember myMembership = groupService.getViewerMembership(groupId, email);
        GroupDto.Response response = groupMapper.studyGroupToResponse(
                group, memberCount,
                myMembership != null ? myMembership.getRole() : null,
                myMembership != null ? myMembership.getStatus() : null);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{groupId}")
    public ResponseEntity<GroupDto.Response> updateGroup(@PathVariable Long groupId,
                                                          @RequestBody GroupDto.Patch requestBody) {
        String email = getLoggedInEmail();
        StudyGroup updated = groupService.updateGroup(groupId, email, requestBody.getName(), requestBody.getDescription());
        int memberCount = groupService.getMemberCount(groupId);
        GroupMember myMembership = groupService.getViewerMembership(groupId, email);
        GroupDto.Response response = groupMapper.studyGroupToResponse(
                updated, memberCount,
                myMembership != null ? myMembership.getRole() : null,
                myMembership != null ? myMembership.getStatus() : null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId) {
        String email = getLoggedInEmail();
        groupService.deleteGroup(groupId, email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<GroupDto.MemberResponse>> getMembers(@PathVariable Long groupId) {
        String email = getLoggedInEmail();
        List<GroupMember> members = groupService.getMembers(groupId, email);
        List<GroupDto.MemberResponse> responses = members.stream()
                .map(groupMapper::groupMemberToMemberResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{groupId}/requests")
    public ResponseEntity<List<GroupDto.MemberResponse>> getPendingRequests(@PathVariable Long groupId) {
        String email = getLoggedInEmail();
        List<GroupMember> pending = groupService.getPendingRequests(groupId, email);
        List<GroupDto.MemberResponse> responses = pending.stream()
                .map(groupMapper::groupMemberToMemberResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/{groupId}/join")
    public ResponseEntity<GroupDto.MemberResponse> requestJoin(@PathVariable Long groupId) {
        String email = getLoggedInEmail();
        GroupMember gm = groupService.requestJoin(groupId, email);
        return new ResponseEntity<>(groupMapper.groupMemberToMemberResponse(gm), HttpStatus.CREATED);
    }

    @PostMapping("/{groupId}/invite")
    public ResponseEntity<GroupDto.MemberResponse> inviteMember(@PathVariable Long groupId,
                                                                  @RequestParam String targetEmail) {
        String email = getLoggedInEmail();
        GroupMember gm = groupService.inviteMember(groupId, email, targetEmail);
        return new ResponseEntity<>(groupMapper.groupMemberToMemberResponse(gm), HttpStatus.CREATED);
    }

    @PostMapping("/{groupId}/approve/{memberId}")
    public ResponseEntity<GroupDto.MemberResponse> approveRequest(@PathVariable Long groupId,
                                                                    @PathVariable Long memberId) {
        String email = getLoggedInEmail();
        GroupMember gm = groupService.approveRequest(groupId, email, memberId);
        return ResponseEntity.ok(groupMapper.groupMemberToMemberResponse(gm));
    }

    @DeleteMapping("/{groupId}/members/{memberId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long groupId,
                                              @PathVariable Long memberId) {
        String email = getLoggedInEmail();
        groupService.removeMember(groupId, email, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/feed")
    public ResponseEntity<PostDto.AbstractPageResponse> getGroupFeed(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size) {
        String email = getLoggedInEmail();
        com.amadProject.amadApp.domain.member.entity.Member member = groupService.getMemberByEmail(email);
        Page<Post> postPage = postService.findGroupFeed(member.getId(), page, size);
        List<PostDto.AbstractResponse> responses = postPage.getContent().stream()
                .map(postMapper::postToAbstractResponse)
                .collect(Collectors.toList());
        PostDto.AbstractPageResponse pageResponse = postMapper.postsToAbstractPageResponses(
                responses, postPage.getTotalPages());
        return ResponseEntity.ok(pageResponse);
    }

    @GetMapping("/{groupId}/posts")
    public ResponseEntity<PostDto.AbstractPageResponse> getGroupPosts(
            @PathVariable Long groupId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size) {
        String email = getLoggedInEmail();
        // Verify membership
        groupService.getMembers(groupId, email);
        Page<Post> postPage = postService.findGroupPosts(groupId, page, size);
        List<PostDto.AbstractResponse> responses = postPage.getContent().stream()
                .map(postMapper::postToAbstractResponse)
                .collect(Collectors.toList());
        PostDto.AbstractPageResponse pageResponse = postMapper.postsToAbstractPageResponses(
                responses, postPage.getTotalPages());
        return ResponseEntity.ok(pageResponse);
    }
}
