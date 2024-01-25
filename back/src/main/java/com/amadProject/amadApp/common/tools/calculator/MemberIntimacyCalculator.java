package com.amadProject.amadApp.common.tools.calculator;

import com.amadProject.amadApp.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberIntimacyCalculator {

//    public void checkIsPenalty(Member member){
//        if (member.getPenaltyPoints() >= 10){
//            deductIntimacyPoint(member);
//        }
//    }

    public void increasePenalty(Member member){
        member.setPenaltyPoints(member.getPenaltyPoints()+1);
    }

    public void addIntimacyPoint(Member member){
        member.setIntimacy(member.getIntimacy()+1);
    }

    public void deductIntimacyPoint(Member member){
        member.setIntimacy(member.getIntimacy()-5);
        member.setPenaltyPoints(0);
    }
}
