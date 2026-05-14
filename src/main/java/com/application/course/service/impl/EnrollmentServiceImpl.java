package com.application.course.service.impl;

import com.application.course.entity.Course;
import com.application.course.entity.Enrollment;
import com.application.course.entity.User;
import com.application.course.repository.CourseRepository;
import com.application.course.repository.EnrollmentRepository;
import com.application.course.service.EnrollmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository,
                                 CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public Enrollment enroll(User user, Long courseId) {
        if (enrollmentRepository.existsByUserAndCourseId(user, courseId)) {
            throw new IllegalStateException("Vous êtes déjà inscrit à ce cours.");
        }
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Cours introuvable."));

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .progressPercent(0)
                .build();
        return enrollmentRepository.save(enrollment);
    }

    @Override
    public boolean isEnrolled(User user, Long courseId) {
        return enrollmentRepository.existsByUserAndCourseId(user, courseId);
    }

    @Override
    public List<Enrollment> findByUser(User user) {
        return enrollmentRepository.findByUser(user);
    }
}
