package com.amadProject.amadApp.common.dummyLoader;

import com.amadProject.amadApp.common.auth.utils.CustomAuthorityUtils;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.amad.repository.AmadRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.amadProject.amadApp.domain.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.repository.BibleChapterVerseRepository;
import com.amadProject.amadApp.domain.post.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@AllArgsConstructor
public class PostDummyLoader implements CommandLineRunner {

    private final PostRepository repository;
    private final MemberRepository memberRepository;
    private final BibleChapterVerseRepository bibleChapterVerseRepository;
    private final AmadRepository amadRepository;


    @Override
    public void run(String... args) throws Exception {

        Post josephPost = new Post();
        Amad amad1 = new Amad();
        Member joseph = memberRepository.findByEmail("happyJoseph@gmail.com").get();
        BibleChapterVerse bibleChapterVerse1 = new BibleChapterVerse();
        bibleChapterVerse1.setPost(josephPost);
        bibleChapterVerse1.setBible("john");
        bibleChapterVerse1.setBibleChapter(15);
        bibleChapterVerse1.setBibleVerseFrom(11);
        bibleChapterVerse1.setBibleVerseTo(11);

        amad1.setPost(josephPost);
        amad1.setMember(joseph);
        amad1.setMission("행복을 전하기 위해 교회 친구 5명에게 사랑을 전하는 문자 돌리기");

        josephPost.setMember(joseph);
        josephPost.setTitle("행복의 하나님");
        josephPost.setContent_1("행복의 하나님");
        josephPost.setContent_2("나는 네가 내 안에서 늘 행복하기를 원한다.");
        josephPost.setContent_3("나는 늘 불행했던것 같아요. 하나님이 나의 아버지 되심을 알았지만 세상이 주는 불행에 늘 허우적 거리는 " +
                "나를 오늘 보게 하십니다.");
        josephPost.setContent_4("그럼에도 오늘 하나님께서는 말씀하십니다. 내안에서 너는 행복하라. 하나님안에 있는 우리가 " +
                "불행한것은 어떻게 보면 교만이고 불순종일 지도 모릅니다.");
        josephPost.setContent_5("하나님께서는 제게 오늘 최선을 다해 하나님과 소통하고 그안에서 하나님이 주시는 행복을 누리기를 원하십니다. " +
                "또한 행복의 통로가 되어서 사랑하는 사람들에게 행복을 전하는 일을 하기를 원하십니다.");
        josephPost.setAmad(amad1);

        repository.save(josephPost);
        amadRepository.save(amad1);
        bibleChapterVerseRepository.save(bibleChapterVerse1);

        Post mariaPost = new Post();
        Amad amad2 = new Amad();
        Member maria = memberRepository.findByEmail("GoodMaria@gmail.com").get();
        BibleChapterVerse bibleChapterVerse2 = new BibleChapterVerse();
        bibleChapterVerse2.setPost(mariaPost);
        bibleChapterVerse2.setBible("1tim");
        bibleChapterVerse2.setBibleChapter(6);
        bibleChapterVerse2.setBibleVerseFrom(12);
        bibleChapterVerse2.setBibleVerseTo(12);

        amad2.setPost(mariaPost);
        amad2.setMember(maria);
        amad2.setMission("의식적으로 10번이상 하나님께 묻고 행하기");

        mariaPost.setMember(maria);
        mariaPost.setTitle("선의 하나님");
        mariaPost.setContent_1("선의 하나님");
        mariaPost.setContent_2("하나님은 선이십니다. 하나님께 묻고 살때 우리는 선한 싸움을 싸울 수 있습니다.");
        mariaPost.setContent_3("하나님께 물으며 선한 싸움을 하기보다는 현실과 타협하고 선을 행할때도 내 의를 위해 행했습니다.");
        mariaPost.setContent_4("그럼에도 오늘 하나님께서는 말씀하십니다. 유일한 선은 하나님 이십니다. 우리가 하나님의 뜻을 구하고 이를" +
                "순종할때 우리는 진정 선한 싸움을 싸울 수 있고 승리할 수 있습니다.");
        mariaPost.setContent_5("하나님께서는 제게 오늘 최선을 다해 하나님께 모든 상황속에서 의식적으로 묻고 순종하는 연습을 하시기를 원하십니다.");
        mariaPost.setAmad(amad2);

        repository.save(mariaPost);
        amadRepository.save(amad2);
        bibleChapterVerseRepository.save(bibleChapterVerse2);

        Post JohnPost = new Post();
        Amad amad3 = new Amad();
        Member john = memberRepository.findByEmail("HolyJohn@gmail.com").get();
        BibleChapterVerse bibleChapterVerse3 = new BibleChapterVerse();
        bibleChapterVerse3.setPost(JohnPost);
        bibleChapterVerse3.setBible("lev");
        bibleChapterVerse3.setBibleChapter(20);
        bibleChapterVerse3.setBibleVerseFrom(26);
        bibleChapterVerse3.setBibleVerseTo(26);

        amad3.setPost(JohnPost);
        amad3.setMember(john);
        amad3.setMission("SNS등을 절재하고 구별된 하루 살아보기");

        JohnPost.setMember(john);
        JohnPost.setTitle("거룩하신 하나님");
        JohnPost.setContent_1("거룩하신 하나님");
        JohnPost.setContent_2("하나님과의 관계를 위해선 우리도 거룩하여야 합니다. 우리는 하나님께 대하서 거리끼는 것들을 " +
                "회개하여 처리하고 친밀하게 교제할때 하나님을 통해서만 거룩해 질 수 있습니다.");
        JohnPost.setContent_3("하나님께서는 우리는 거룩하게 지으셨음에도 세상의 유혹에 늘 넘어가 하나님을 찾기보다는 세상의 것에서" +
                "평안과 만족을 얻으려 하는 저를 보게 하셨습니다.");
        JohnPost.setContent_4("그럼에도 오늘 하나님께서는 말씀하십니다. 거룩하고 거룩하라, 하나님의 뜻을 분명히 알기 위해서는" +
                "우리가 먼저 세상과 구별되고 하나님께 나의 시간을 집중할 필요가 있습니다.");
        JohnPost.setContent_5("하나님께서는 제게 오늘 최선을 다해 하나님께 집중하고 대화하기를 원하십니다.");
        JohnPost.setAmad(amad3);

        repository.save(JohnPost);
        amadRepository.save(amad3);
        bibleChapterVerseRepository.save(bibleChapterVerse3);

        Post DavidPost = new Post();
        Amad amad4 = new Amad();
        Member david = memberRepository.findByEmail("BraveDavid@gmail.com").get();
        BibleChapterVerse bibleChapterVerse4 = new BibleChapterVerse();
        bibleChapterVerse4.setPost(DavidPost);
        bibleChapterVerse4.setBible("eph");
        bibleChapterVerse4.setBibleChapter(3);
        bibleChapterVerse4.setBibleVerseFrom(12);
        bibleChapterVerse4.setBibleVerseTo(12);

        amad4.setPost(DavidPost);
        amad4.setMember(david);
        amad4.setMission("걱정하지 않기");

        DavidPost.setMember(david);
        DavidPost.setTitle("힘되시는 하나님");
        DavidPost.setContent_1("힘되시는 하나님");
        DavidPost.setContent_2("하나님께서는 오늘 담대하라고 말씀하십니다. 하나님의 뜻안에서 우리에게 불가능한 일은 없습니다.");
        DavidPost.setContent_3("하나님께서는 우리를 세상이 감당하지 못할자라 하시고 걱정하지 말고 담대히 세상에 나가 싸우라 하셨습니다." +
                "하지만 저는 세상이 주는 걱정과 고난들에 늘 이리저리 치이기만 하였습니다.");
        DavidPost.setContent_4("그럼에도 오늘 하나님께서는 말씀하십니다. 하나님을 아는것이 또 하나님의 뜻을 아는것이 나의 힘이라고," +
                "그분의 뜻을 온전히 구하고 순종할때 불가능한 일을 없다고 말씀하십니다. 내가 아닌 하나님이 하시니까요.");
        DavidPost.setContent_5("하나님께서는 제게 오늘 걱정하지않고 세상에서 얻은 걱정과 문제들을 진솔하게 하나님께 내려놓기 원하십니다.");
        DavidPost.setAmad(amad4);

        repository.save(DavidPost);
        amadRepository.save(amad4);
        bibleChapterVerseRepository.save(bibleChapterVerse4);


        Post myPost = new Post();
        Amad myAmad = new Amad();
        Member me = memberRepository.findByEmail("tbvjdngus@gmail.com").get();
        BibleChapterVerse bibleChapterVerse5 = new BibleChapterVerse();
        bibleChapterVerse5.setPost(myPost);
        bibleChapterVerse5.setBible("eph");
        bibleChapterVerse5.setBibleChapter(3);
        bibleChapterVerse5.setBibleVerseFrom(12);
        bibleChapterVerse5.setBibleVerseTo(12);

        myAmad.setPost(myPost);
        myAmad.setMember(me);
        myAmad.setMission("걱정하지 않기");

        myPost.setMember(me);
        myPost.setTitle("힘되시는 하나님");
        myPost.setContent_1("힘되시는 하나님");
        myPost.setContent_2("하나님께서는 오늘 담대하라고 말씀하십니다. 하나님의 뜻안에서 우리에게 불가능한 일은 없습니다.");
        myPost.setContent_3("하나님께서는 우리를 세상이 감당하지 못할자라 하시고 걱정하지 말고 담대히 세상에 나가 싸우라 하셨습니다." +
                "하지만 저는 세상이 주는 걱정과 고난들에 늘 이리저리 치이기만 하였습니다.");
        myPost.setContent_4("그럼에도 오늘 하나님께서는 말씀하십니다. 하나님을 아는것이 또 하나님의 뜻을 아는것이 나의 힘이라고," +
                "그분의 뜻을 온전히 구하고 순종할때 불가능한 일을 없다고 말씀하십니다. 내가 아닌 하나님이 하시니까요.");
        myPost.setContent_5("하나님께서는 제게 오늘 걱정하지않고 세상에서 얻은 걱정과 문제들을 진솔하게 하나님께 내려놓기 원하십니다.");
        myPost.setAmad(myAmad);

        LocalDate time = LocalDate.now().minusDays(1);
        myPost.setPublishedDate(time);

        repository.save(myPost);
        amadRepository.save(myAmad);
        bibleChapterVerseRepository.save(bibleChapterVerse5);





    }
}

