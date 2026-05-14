package com.application.course.service;

import com.application.course.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    List<Course> findAll();
    List<Course> findFeatured();
    Optional<Course> findById(Long id);
    List<Course> findByCategoryId(Long categoryId);
    List<Course> findByInstructorId(Long instructorId);
    List<Course> search(String search, Long categoryId, String level, Boolean free, String sort);
}
