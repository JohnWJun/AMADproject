package com.amadProject.amadApp.domain.follow.controller;

import com.amadProject.amadApp.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/members/{following-id}/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{follower-id}")
    public ResponseEntity follow(@PathVariable("following-id") long followingId,
                                 @PathVariable("follower-id") long followerId) {
        followService.follow(followerId, followingId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{follower-id}")
    public ResponseEntity unfollow(@PathVariable("following-id") long followingId,
                                   @PathVariable("follower-id") long followerId) {
        followService.unfollow(followerId, followingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{follower-id}/status")
    public ResponseEntity getFollowStatus(@PathVariable("following-id") long followingId,
                                          @PathVariable("follower-id") long followerId) {
        boolean following = followService.isFollowing(followerId, followingId);
        long followerCount = followService.getFollowerCount(followingId);
        long followingCount = followService.getFollowingCount(followingId);
        return new ResponseEntity<>(Map.of(
                "following", following,
                "followerCount", followerCount,
                "followingCount", followingCount
        ), HttpStatus.OK);
    }
}
