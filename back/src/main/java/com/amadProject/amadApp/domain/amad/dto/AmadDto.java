package com.amadProject.amadApp.domain.amad.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class AmadDto {

    @Getter
    @Setter
    public static class Post{
        private String mission;
        private String description;
    }

    @Getter
    @Setter
    public static class Patch{
        private String mission;
        private String description;
        private boolean isComplete;
    }

    @Getter
    @Setter
    public static class Response{
        private long id;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private boolean isComplete;
        private String mission;
        private String description;
    }
}
