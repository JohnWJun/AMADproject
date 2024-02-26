package com.amadProject.amadApp.domain.comment.mapper;

import com.amadProject.amadApp.domain.comment.dto.CommentDto;
import com.amadProject.amadApp.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface CommentMapper {


        Comment postToComment (CommentDto.Post post);
        default CommentDto.Response commentToResponse (Comment comment){

            CommentDto.Response response = new CommentDto.Response();
            response.setPostId(comment.getPost().getId());
            response.setId(comment.getId());
            response.setNickname(comment.getMember().getNickname());
            response.setMention(comment.getMention());
            response.setCreatedAt(comment.getCreatedAt());
            response.setModifiedAt(comment.getModifiedAt());
            response.setWriter(comment.getMember().getEmail());
            response.setStatusImg(comment.getMember().getStatusImg());

            return response;
        };
        List<CommentDto.Response> commentsToResponses (List<Comment> comments);

        Comment patchToComment(CommentDto.Patch patch);
}

