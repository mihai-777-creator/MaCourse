package com.application.course.controller;

import com.application.course.entity.User;
import com.application.course.service.EnrollmentService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    private final EnrollmentService enrollmentService;

    public AuthController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/login")
    public String showLoginPage(@AuthenticationPrincipal User user,
                                @RequestParam(value = "error",      required = false) String error,
                                @RequestParam(value = "logout",     required = false) String logout,
                                @RequestParam(value = "registered", required = false) String registered,
                                Model model) {
        if (user != null) {
            return "redirect:/index";
        }
        if (error      != null) model.addAttribute("formError",   "Email ou mot de passe incorrect.");
        if (logout     != null) model.addAttribute("formInfo",    "Vous avez été déconnecté avec succès.");
        if (registered != null) model.addAttribute("formSuccess", "Compte créé avec succès. Vous pouvez maintenant vous connecter.");
        return "login";
    }

    @GetMapping("/dashboard")
    public String showDashboard(@AuthenticationPrincipal User user, Model model) {
        if (user == null) {
            return "redirect:/login";
        }
        var enrollments = enrollmentService.findByUser(user);
        int totalStudyHours = enrollments.stream()
                .mapToInt(e -> {
                    String dur = e.getCourse().getDuration();
                    try { return Integer.parseInt(dur.replaceAll("[^0-9]", "")); }
                    catch (NumberFormatException ex) { return 0; }
                }).sum();
        model.addAttribute("currentUser",   user);
        model.addAttribute("enrollments",   enrollments);
        model.addAttribute("enrolledCount", enrollments.size());
        model.addAttribute("studyHours",    totalStudyHours);
        return "dashboard";
    }
}
