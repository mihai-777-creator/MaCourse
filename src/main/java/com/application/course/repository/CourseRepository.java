package com.application.course.repository;

import com.application.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByFeaturedTrue();

    List<Course> findByCategoryId(Long categoryId);

    List<Course> findByInstructorId(Long instructorId);

    @Query("""
        SELECT c FROM Course c
        WHERE (:search IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))
          AND (:categoryId IS NULL OR c.category.id = :categoryId)
          AND (:level IS NULL OR c.level = :level)
          AND (:free IS NULL OR c.free = :free)
    """)
    List<Course> findFiltered(
            @Param("search") String search,
            @Param("categoryId") Long categoryId,
            @Param("level") String level,
            @Param("free") Boolean free
    );
}
