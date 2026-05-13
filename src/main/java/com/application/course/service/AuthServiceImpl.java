package com.application.course.service;

import com.application.course.entity.Role;
import com.application.course.entity.User;
import com.application.course.repository.RoleRepository;
import com.application.course.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Optional<User> searchUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(String username, String email, String password) {
        Role userRole = roleRepository.findByName("ROLE_USER");

        User user = User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(userRole)
                .isEnabled(true)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
