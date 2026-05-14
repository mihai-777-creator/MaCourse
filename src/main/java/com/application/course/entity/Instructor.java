package com.application.course.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instructors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = false)
    private String avatar;

    @Column(name = "student_count", nullable = false)
    private Integer studentCount;

    @ElementCollection
    @CollectionTable(name = "instructor_specialties", joinColumns = @JoinColumn(name = "instructor_id"))
    @Column(name = "specialty")
    @Builder.Default
    private List<String> specialties = new ArrayList<>();
}
