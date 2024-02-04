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
            response.setNickname(comment.getMember().getNickname());
            response.setMention(comment.getMention());
            response.setCreatedAt(comment.getCreatedAt());
            response.setModifiedAt(comment.getModifiedAt());

            return response;
        };
        List<CommentDto.Response> commentsToResponses (List<Comment> comments);

        Comment patchToComment(CommentDto.Patch patch);
}
