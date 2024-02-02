package com.amadProject.amadApp.comment.mapper;

import com.amadProject.amadApp.comment.dto.CommentDto;
import com.amadProject.amadApp.comment.entity.Comment;
import com.amadProject.amadApp.member.dto.MemberDto;
import com.amadProject.amadApp.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface CommentMapper {


        Comment postToComment (CommentDto.Post post);
        default CommentDto.Response commentToResponse (Comment comment){

            CommentDto.Response response = new CommentDto.Response();
            response.setNickname(comment.getMember().getNickname());
            response.setMention(comment.getMention());

            return response;
        };
        List<CommentDto.Response> commentsToCommentResponses (List<Comment> comments);
    }

