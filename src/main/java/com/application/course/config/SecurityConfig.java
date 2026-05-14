package com.application.course.config;

import com.application.course.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CustomUserDetailsService userDetailsService) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .userDetailsService(userDetailsService)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/static/**", "/style.css", "/script.js", "/data.js").permitAll()
                        .requestMatchers("/", "/index", "/login", "/register").permitAll()
                        .requestMatchers("/dashboard", "/courses/*/enroll",
                                         "/cart/**", "/profile", "/profile/update").authenticated()
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/index", true)
                        .failureUrl("/login?error=true")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/login?logout=true")
                        .permitAll()
                );
        
        return http.build();
    }
}
