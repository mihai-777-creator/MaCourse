package com.application.course.service.impl;

import com.application.course.entity.Course;
import com.application.course.repository.CourseRepository;
import com.application.course.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> findFeatured() {
        return courseRepository.findByFeaturedTrue();
    }

    @Override
    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    @Override
    public List<Course> findByCategoryId(Long categoryId) {
        return courseRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Course> findByInstructorId(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    @Override
    public List<Course> search(String search, Long categoryId, String level, Boolean free, String sort) {
        String searchParam = (search != null && !search.isBlank()) ? search.trim() : null;
        String levelParam  = (level != null && !level.isBlank()) ? level.trim() : null;

        List<Course> results = courseRepository.findFiltered(searchParam, categoryId, levelParam, free);

        if (sort == null) return results;
        return switch (sort) {
            case "rating"     -> results.stream().sorted(Comparator.comparingDouble(Course::getRating).reversed()).toList();
            case "price-low"  -> results.stream().sorted(Comparator.comparingDouble(Course::getPrice)).toList();
            case "price-high" -> results.stream().sorted(Comparator.comparingDouble(Course::getPrice).reversed()).toList();
            default           -> results.stream().sorted(Comparator.comparingInt(Course::getStudents).reversed()).toList();
        };
    }
}
