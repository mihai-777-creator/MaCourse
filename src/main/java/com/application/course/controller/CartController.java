package com.application.course.controller;

import com.application.course.entity.User;
import com.application.course.service.CartService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public String viewCart(@AuthenticationPrincipal User currentUser, Model model) {
        if (currentUser == null) {
            return "redirect:/login";
        }
        model.addAttribute("cartItems", cartService.getCartItems(currentUser));
        model.addAttribute("cartTotal", cartService.getCartTotal(currentUser));
        return "cart";
    }

    @PostMapping("/add/{courseId}")
    public String addToCart(@PathVariable Long courseId,
                            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return "redirect:/login";
        }
        cartService.addToCart(currentUser, courseId);
        return "redirect:/course-details?id=" + courseId + "&cartAdded=true";
    }

    @PostMapping("/remove/{courseId}")
    public String removeFromCart(@PathVariable Long courseId,
                                 @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return "redirect:/login";
        }
        cartService.removeFromCart(currentUser, courseId);
        return "redirect:/cart";
    }
}
