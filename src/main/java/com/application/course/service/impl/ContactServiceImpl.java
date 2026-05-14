package com.application.course.service.impl;

import com.application.course.entity.ContactMessage;
import com.application.course.repository.ContactMessageRepository;
import com.application.course.service.ContactService;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    public void saveMessage(String name, String email, String subject, String message) {
        ContactMessage msg = ContactMessage.builder()
                .name(name.trim())
                .email(email.trim().toLowerCase())
                .subject(subject.trim())
                .message(message.trim())
                .isRead(false)
                .build();
        contactMessageRepository.save(msg);
    }
}
