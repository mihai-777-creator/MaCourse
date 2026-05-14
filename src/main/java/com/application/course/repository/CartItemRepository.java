package com.application.course.repository;

import com.application.course.entity.CartItem;
import com.application.course.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    boolean existsByUserAndCourseId(User user, Long courseId);
    void deleteByUserAndCourseId(User user, Long courseId);
}
