package com.application.course.service;

import com.application.course.entity.Instructor;

import java.util.List;
import java.util.Optional;

public interface InstructorService {
    List<Instructor> findAll();
    Optional<Instructor> findById(Long id);
}
