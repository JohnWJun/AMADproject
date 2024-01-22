package com.amadProject.amadApp.auth;



import com.amadProject.amadApp.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.io.Decoders;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JwtTokenizerTest {
    private static JwtTokenizer jwtTokenizer;
    private String secretKey;
    private String base64EncodedSecretKey;

    @BeforeAll
    public void init() {
        jwtTokenizer = new JwtTokenizer();
        secretKey = "AMADProjectJwtTokenizerTestSecretKey0022031245";

        base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(secretKey);
    }

    @Test
    public void encodedBase64SecretKeyTest(){
        assertThat(secretKey, is(new String(Decoders.BASE64URL.decode(base64EncodedSecretKey))));
    }

    @Test
    public void generateAccessTokenTest(){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", "amad@gmail.com");
        claims.put("roles", List.of("USER"));

        String subject = "amad@gmail.com";

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 10);

        Date expiration = calendar.getTime();

        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);

        System.out.println("Test AccessToken Generator: "+ accessToken);

        assertThat(accessToken,notNullValue());

    }

    @Test
    public void generateRefreshTokenTest(){
        String subject = "amad@gmail.com";

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 10);

        Date expiration = calendar.getTime();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

        System.out.println("Test RefreshToken Generator: "+ refreshToken);

        assertThat(refreshToken,notNullValue());

    }
}
