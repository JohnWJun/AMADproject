package com.amadProject.amadApp.common.auth.interceptor;

import com.amadProject.amadApp.common.auth.jwt.JwtTokenizer;
import com.amadProject.amadApp.common.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class StompChannelInterceptor implements ChannelInterceptor {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            String bearer = accessor.getFirstNativeHeader("Authorization");
            if (bearer != null && bearer.startsWith("Bearer ")) {
                String token = bearer.substring(7);
                String base64Key = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
                Map<String, Object> claims = jwtTokenizer.getClaims(token, base64Key).getBody();
                String username = (String) claims.get("username");
                List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>) claims.get("roles"));
                accessor.setUser(new UsernamePasswordAuthenticationToken(username, null, authorities));
            }
        }
        return message;
    }
}
