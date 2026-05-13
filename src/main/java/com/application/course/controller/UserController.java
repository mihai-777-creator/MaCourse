package com.application.course.controller;

import com.application.course.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegister(Model model) {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String username,
                               @RequestParam String email,
                               @RequestParam String password,
                               Model model) {
        // simple server-side validation
        if (username == null || username.isBlank() || email == null || email.isBlank() || password == null || password.length() < 6) {
            model.addAttribute("error", "Vă rugăm completați toate câmpurile corect.");
            return "register";
        }

        if (userService.findByEmail(email).isPresent()) {
            model.addAttribute("error", "Acest email este deja înregistrat.");
            return "register";
        }

        userService.registerUser(username, email, password);
        model.addAttribute("success", "Cont creat cu succes. Puteți să vă autentificați.");
        return "login";
    }
}
