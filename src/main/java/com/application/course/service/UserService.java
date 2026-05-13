package com.application.course.service;

import com.application.course.entity.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    User registerUser(String username, String email, String password);
}
