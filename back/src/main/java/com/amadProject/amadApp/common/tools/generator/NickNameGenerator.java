package com.amadProject.amadApp.common.tools.generator;

import java.util.Arrays;
import java.util.List;

public interface NickNameGenerator {
    List<String> adjectives = Arrays.asList("고요한", "빛나는", "풍부한", "평화로운", "용감한", "평안한", "신비로운", "인내심 있는", "창조적인", "감사한", "예술적인", "자비로운", "선한", "존경받는", "자유로운", "관대한", "지혜로운", "강한", "고귀한", "유연한");

    List<String> characters = Arrays.asList(
            "아담", "에바", "노아", "아브라함", "사라", "이삭", "리브가", "야곱", "리아", "라헬", "요셉", "모세", "아론", "미리암", "다윗", "솔로몬", "에스더", "룻", "사무엘", "델라일라", "다니엘", "기드온", "한나", "예레미야", "에스겔", "이사야", "스가랴", "요한", "마리아");

    String randomNickNameGenerator(List<String> adjectives,List<String>characters);
}
