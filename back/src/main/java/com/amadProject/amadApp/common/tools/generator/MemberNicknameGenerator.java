package com.amadProject.amadApp.common.tools.generator;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class MemberNicknameGenerator implements NickNameGenerator {

    @Override
    public String randomNickNameGenerator(List<String> adjectives, List<String> characters) {
        Random random = new Random();
        int adjIndex = random.nextInt(adjectives.size());

        int animalIndex = random.nextInt(characters.size());
        String adjective = adjectives.get(adjIndex);
        String animal = characters.get(animalIndex);

        return adjective + animal;
    }
}
