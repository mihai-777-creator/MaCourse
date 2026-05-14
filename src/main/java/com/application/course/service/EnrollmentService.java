package com.application.course.service;

import com.application.course.entity.Enrollment;
import com.application.course.entity.User;

import java.util.List;

public interface EnrollmentService {
    Enrollment enroll(User user, Long courseId);
    boolean isEnrolled(User user, Long courseId);
    List<Enrollment> findByUser(User user);
}
