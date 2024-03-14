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
        dummyMember3.setIntimacy(100);
        dummyMember3.setRoles(roles);

        repository.save(dummyMember3);

        Member dummyMember4 = new Member();
        dummyMember4.setEmail("BraveDavid@gmail.com");
        dummyMember4.setNickname("용감한다윗");
        dummyMember4.setStatusImg("/David.png");
        dummyMember4.setIntimacy(70);
        dummyMember4.setRoles(roles);

        repository.save(dummyMember4);

        Member dummyMember5 = new Member();
        dummyMember5.setEmail("dummyMember5@gmail.com");
        dummyMember5.setNickname("dummyMember5");
        dummyMember5.setStatusImg("/Joseph.png");
        dummyMember5.setIntimacy(60);
        dummyMember5.setRoles(roles);

        repository.save(dummyMember5);

        Member dummyMember6 = new Member();
        dummyMember6.setEmail("dummyMember6@gmail.com");
        dummyMember6.setNickname("dummyMember6");
        dummyMember6.setStatusImg("/Maria.png");
        dummyMember6.setRoles(roles);

        repository.save(dummyMember6);

        Member dummyMember7 = new Member();
        dummyMember7.setEmail("dummyMember7@gmail.com");
        dummyMember7.setNickname("dummyMember7");
        dummyMember7.setStatusImg("/John.png");
        dummyMember7.setRoles(roles);

        repository.save(dummyMember7);

        Member dummyMember8 = new Member();
        dummyMember8.setEmail("dummyMember8@gmail.com");
        dummyMember8.setNickname("dummyMember8");
        dummyMember8.setStatusImg("/David.png");
        dummyMember8.setRoles(roles);

        repository.save(dummyMember8);

        Member dummyMember9 = new Member();
        dummyMember9.setEmail("dummyMember9@gmail.com");
        dummyMember9.setNickname("dummyMember9");
        dummyMember9.setStatusImg("/Joseph.png");
        dummyMember9.setRoles(roles);

        repository.save(dummyMember9);

        Member dummyMember10 = new Member();
        dummyMember10.setEmail("dummyMember10@gmail.com");
        dummyMember10.setNickname("dummyMember10");
        dummyMember10.setStatusImg("/Maria.png");
        dummyMember10.setRoles(roles);

        repository.save(dummyMember10);

        Member dummyMember11 = new Member();
        dummyMember11.setEmail("dummyMember11@gmail.com");
        dummyMember11.setNickname("dummyMember11");
        dummyMember11.setStatusImg("/John.png");
        dummyMember11.setRoles(roles);

        repository.save(dummyMember11);

        Member dummyMember12 = new Member();
        dummyMember12.setEmail("dummyMember12@gmail.com");
        dummyMember12.setNickname("dummyMember12");
        dummyMember12.setStatusImg("/David.png");
        dummyMember12.setRoles(roles);

        repository.save(dummyMember12);

        Member dummyMember13 = new Member();
        dummyMember13.setEmail("dummyMember13@gmail.com");
        dummyMember13.setNickname("dummyMember13");
        dummyMember13.setStatusImg("/Joseph.png");
        dummyMember13.setRoles(roles);

        repository.save(dummyMember13);

        Member dummyMember14 = new Member();
        dummyMember14.setEmail("dummyMember14@gmail.com");
        dummyMember14.setNickname("dummyMember14");
        dummyMember14.setStatusImg("/Maria.png");
        dummyMember14.setRoles(roles);

        repository.save(dummyMember14);

        Member dummyMember15 = new Member();
        dummyMember15.setEmail("dummyMember15@gmail.com");
        dummyMember15.setNickname("dummyMember15");
        dummyMember15.setStatusImg("/John.png");
        dummyMember15.setRoles(roles);

        repository.save(dummyMember15);

        Member dummyMember16 = new Member();
        dummyMember16.setEmail("dummyMember16@gmail.com");
        dummyMember16.setNickname("dummyMember16");
        dummyMember16.setStatusImg("/David.png");
        dummyMember16.setRoles(roles);

        repository.save(dummyMember16);

//        Member me = new Member();
//        me.setEmail("tbvjdngus@gmail.com");
//        me.setNickname("어드민");
//        me.setStatusImg("/David.png");
//        me.setRoles(roles);
//
//        repository.save(me);

    }
}

