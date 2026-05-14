package com.application.course.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private Integer lessons;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Boolean free;

    @Column(nullable = false)
    private Double rating;

    @Column(name = "rating_count", nullable = false)
    private Integer ratingCount;

    @Column(nullable = false)
    private Integer students;

    @Column(nullable = false)
    private String image;

    @Column(name = "best_seller", nullable = false)
    private Boolean bestSeller;

    @Column(nullable = false)
    private Boolean featured;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @ElementCollection
    @CollectionTable(name = "course_objectives", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "objective")
    @Builder.Default
    private List<String> objectives = new ArrayList<>();
}
