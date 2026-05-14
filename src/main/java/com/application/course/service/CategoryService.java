package com.application.course.service;

import com.application.course.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> findAll();
    Optional<Category> findById(Long id);
}
