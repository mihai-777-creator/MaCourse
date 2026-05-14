package com.application.course.controller;

import com.application.course.service.ContactService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public String submitContact(@RequestParam String name,
                                @RequestParam String email,
                                @RequestParam String subject,
                                @RequestParam String message,
                                Model model) {
        if (name == null || name.isBlank()
                || email == null || email.isBlank()
                || subject == null || subject.isBlank()
                || message == null || message.isBlank()) {
            model.addAttribute("contactError", "Veuillez remplir tous les champs obligatoires.");
            return "contact";
        }

        if (message.trim().length() < 10) {
            model.addAttribute("contactError", "Le message doit contenir au moins 10 caractères.");
            return "contact";
        }

        contactService.saveMessage(name, email, subject, message);
        model.addAttribute("contactSuccess", "Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.");
        return "contact";
    }
}
