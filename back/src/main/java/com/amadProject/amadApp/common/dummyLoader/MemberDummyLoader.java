package com.amadProject.amadApp.common.dummyLoader;

import com.amadProject.amadApp.common.auth.utils.CustomAuthorityUtils;
import com.amadProject.amadApp.common.tools.generator.NickNameGenerator;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.amadProject.amadApp.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class MemberDummyLoader implements CommandLineRunner {

    private final MemberRepository repository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public void run(String... args) throws Exception {
        List<String> roles = authorityUtils.createRoles("test@gmail.com");

        Member dummyMember1 = new Member();
        dummyMember1.setEmail("happyJoseph@gmail.com");
        dummyMember1.setNickname("행복한요셉");
        dummyMember1.setStatusImg("/Joseph.png");
        dummyMember1.setRoles(roles);

        repository.save(dummyMember1);

        Member dummyMember2 = new Member();
        dummyMember2.setEmail("GoodMaria@gmail.com");
        dummyMember2.setNickname("선한마리아");
        dummyMember2.setStatusImg("/Maria.png");
        dummyMember2.setRoles(roles);

        repository.save(dummyMember2);

        Member dummyMember3 = new Member();
        dummyMember3.setEmail("HolyJohn@gmail.com");
        dummyMember3.setNickname("거룩한요한");
        dummyMember3.setStatusImg("/John.png");
        dummyMember3.setRoles(roles);

        repository.save(dummyMember3);

        Member dummyMember4 = new Member();
        dummyMember4.setEmail("BraveDavid@gmail.com");
        dummyMember4.setNickname("용감한다윗");
        dummyMember4.setStatusImg("/David.png");
        dummyMember4.setRoles(roles);

        repository.save(dummyMember4);


    }
}

