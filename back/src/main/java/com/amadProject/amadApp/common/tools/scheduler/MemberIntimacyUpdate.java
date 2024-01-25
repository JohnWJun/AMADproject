package com.amadProject.amadApp.common.tools.scheduler;

import com.amadProject.amadApp.common.tools.calculator.MemberIntimacyCalculator;
import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Component
@RequiredArgsConstructor
public class MemberIntimacyUpdate {

    //Policy//
    //If the member skips making a post, it increases the penaltyPoints up +1.
    //When the penaltyPoints reaches 10 it deducts the member's intimacy points -5

    private final MemberRepository memberRepository;
    private final MemberIntimacyCalculator calculator;
    private static final int INTIMACY_DEDUCTIBLE = 10;

    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Seoul")
    //for test
//    @Scheduled(cron = "0 */1 * * * *")
    private void memberIntimacyDailyUpdateTask(){

        log.info("The daily scheduled task in running...");

        List<Member> membersWhoSkip = memberRepository.findAllByIsMadePostToday();
        List<Member> penaltyIncreasedMembers = membersWhoSkip.stream().map(
                member -> {
                    calculator.increasePenalty(member);
                    member.setMadePostToday(false);
                    memberRepository.save(member);
                    return member;
                }
        ).collect(Collectors.toList());

        log.info("("+(long) penaltyIncreasedMembers.size() +") members got increased their penalty Points");


        List<Member> membersToDeductIntimacy = memberRepository.findAllByPenaltyPoints(INTIMACY_DEDUCTIBLE);

        for (Member member:membersToDeductIntimacy){
            calculator.deductIntimacyPoint(member);
            memberRepository.save(member);
        }

        log.info("("+(long) membersToDeductIntimacy.size() +") members got lost their intimacy points");


        List<Member> membersForResetIsMadePost = memberRepository.findAllByMadePostToday();
        List<Member> resetMembers = membersForResetIsMadePost.stream().map(
                member -> {
                    member.setMadePostToday(false);
                    memberRepository.save(member);
                    return member;
                }
        ).collect(Collectors.toList());
        log.info("("+(long) resetMembers.size() +") members got reset their post records");

    }

}
