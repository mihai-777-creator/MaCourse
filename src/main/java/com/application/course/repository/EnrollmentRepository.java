package com.application.course.repository;

import com.application.course.entity.Enrollment;
import com.application.course.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(User user);
    Optional<Enrollment> findByUserAndCourseId(User user, Long courseId);
    boolean existsByUserAndCourseId(User user, Long courseId);
}
