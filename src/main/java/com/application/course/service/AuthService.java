package com.application.course.service;

import com.application.course.entity.User;
import java.util.Optional;

public interface AuthService {
    Optional<User> searchUserByEmail(String email);
    User saveUser(String username, String email, String password);
    User updateUser(User user);
    Optional<User> getUserById(Long id);
    void deleteUser(Long id);
}
