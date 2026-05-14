package com.application.course.repository;

import com.application.course.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    boolean existsByName(String name);
}
