package com.application.course.service;

import com.application.course.entity.CartItem;
import com.application.course.entity.User;

import java.util.List;

public interface CartService {
    void addToCart(User user, Long courseId);
    void removeFromCart(User user, Long courseId);
    List<CartItem> getCartItems(User user);
    double getCartTotal(User user);
}
