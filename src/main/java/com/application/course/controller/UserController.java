package com.application.course.controller;

import com.application.course.entity.User;
import com.application.course.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Locale;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegisterPage(@AuthenticationPrincipal User currentUser) {
        if (currentUser != null) {
            return "redirect:/index";
        }
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String username,
                               @RequestParam String email,
                               @RequestParam String password,
                               Model model) {
        String normalizedUsername = username == null ? "" : username.trim();
        String normalizedEmail = email == null ? "" : email.trim().toLowerCase(Locale.ROOT);

        if (normalizedUsername.isBlank() || normalizedEmail.isBlank() || password == null || password.length() < 6) {
            model.addAttribute("error", "Va rugam completati toate campurile corect.");
            return "register";
        }

        if (userService.findByEmail(normalizedEmail).isPresent()) {
            model.addAttribute("error", "Acest email este deja inregistrat.");
            return "register";
        }

        userService.registerUser(normalizedUsername, normalizedEmail, password);
        return "redirect:/login?registered=true";
    }
}
