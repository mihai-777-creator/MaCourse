package com.application.course.controller;

import com.application.course.entity.User;
import com.application.course.service.EnrollmentService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/courses/{id}/enroll")
    public String enroll(@PathVariable Long id,
                         @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return "redirect:/login";
        }
        try {
            enrollmentService.enroll(currentUser, id);
            return "redirect:/course-details?id=" + id + "&enrolled=true";
        } catch (IllegalStateException e) {
            return "redirect:/course-details?id=" + id + "&alreadyEnrolled=true";
        }
    }
}
