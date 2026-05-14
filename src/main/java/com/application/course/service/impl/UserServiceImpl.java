package com.application.course.service.impl;

import com.application.course.entity.Role;
import com.application.course.entity.User;
import com.application.course.repository.RoleRepository;
import com.application.course.repository.UserRepository;
import com.application.course.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(normalizeEmail(email));
    }

    @Override
    public User registerUser(String username, String email, String password) {
        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole == null) {
            throw new IllegalStateException("ROLE_USER nu este configurat.");
        }

        User user = User.builder()
                .username(normalizeUsername(username))
                .email(normalizeEmail(email))
                .password(passwordEncoder.encode(password))
                .role(userRole)
                .isEnabled(true)
                .build();

        return userRepository.save(user);
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeUsername(String username) {
        return username == null ? "" : username.trim();
    }
}
