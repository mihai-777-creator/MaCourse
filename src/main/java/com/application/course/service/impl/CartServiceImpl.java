package com.application.course.service.impl;

import com.application.course.entity.CartItem;
import com.application.course.entity.Course;
import com.application.course.entity.User;
import com.application.course.repository.CartItemRepository;
import com.application.course.repository.CourseRepository;
import com.application.course.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final CourseRepository courseRepository;

    public CartServiceImpl(CartItemRepository cartItemRepository,
                           CourseRepository courseRepository) {
        this.cartItemRepository = cartItemRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void addToCart(User user, Long courseId) {
        if (cartItemRepository.existsByUserAndCourseId(user, courseId)) {
            return;
        }
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Cours introuvable."));
        CartItem item = CartItem.builder().user(user).course(course).build();
        cartItemRepository.save(item);
    }

    @Override
    @Transactional
    public void removeFromCart(User user, Long courseId) {
        cartItemRepository.deleteByUserAndCourseId(user, courseId);
    }

    @Override
    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    @Override
    public double getCartTotal(User user) {
        return cartItemRepository.findByUser(user).stream()
                .mapToDouble(item -> item.getCourse().getPrice())
                .sum();
    }
}
