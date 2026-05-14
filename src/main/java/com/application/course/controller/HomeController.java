package com.application.course.controller;

import com.application.course.service.CategoryService;
import com.application.course.service.CourseService;
import com.application.course.service.EnrollmentService;
import com.application.course.service.InstructorService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    private final CategoryService categoryService;
    private final CourseService courseService;
    private final InstructorService instructorService;
    private final EnrollmentService enrollmentService;

    public HomeController(CategoryService categoryService,
                          CourseService courseService,
                          InstructorService instructorService,
                          EnrollmentService enrollmentService) {
        this.categoryService = categoryService;
        this.courseService = courseService;
        this.instructorService = instructorService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/")
    public String home(Model model) {
        return index(model);
    }

    @GetMapping("/index")
    public String index(Model model) {
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("featuredCourses", courseService.findFeatured());
        model.addAttribute("instructors", instructorService.findAll());
        return "index";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/categories")
    public String categories(Model model) {
        var cats = categoryService.findAll();
        var allCourses = courseService.findAll();
        var countMap = allCourses.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        c -> c.getCategory().getId(), java.util.stream.Collectors.counting()));
        model.addAttribute("categories", cats);
        model.addAttribute("courseCountMap", countMap);
        return "categories";
    }

    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    @GetMapping("/course-details")
    public String courseDetails(@RequestParam(required = false) Long id,
                                @org.springframework.security.core.annotation.AuthenticationPrincipal
                                com.application.course.entity.User currentUser,
                                Model model) {
        if (id == null) {
            return "redirect:/courses";
        }
        return courseService.findById(id).map(course -> {
            model.addAttribute("course", course);
            model.addAttribute("instructor", course.getInstructor());
            model.addAttribute("similarCourses",
                courseService.findByCategoryId(course.getCategory().getId())
                    .stream().filter(c -> !c.getId().equals(id)).limit(3).toList());
            boolean enrolled = currentUser != null && enrollmentService.isEnrolled(currentUser, id);
            model.addAttribute("isEnrolled", enrolled);
            return "course-details";
        }).orElse("redirect:/courses");
    }

    @GetMapping("/courses")
    public String courses(@RequestParam(required = false) String search,
                          @RequestParam(required = false) Long category,
                          @RequestParam(required = false) Long instructor,
                          @RequestParam(required = false) String level,
                          @RequestParam(required = false) String price,
                          @RequestParam(required = false) String sort,
                          Model model) {
        Boolean freeFilter = null;
        if ("free".equals(price)) freeFilter = true;
        if ("paid".equals(price)) freeFilter = false;

        var courses = instructor != null
                ? courseService.findByInstructorId(instructor)
                : courseService.search(search, category, level, freeFilter, sort);

        model.addAttribute("courses", courses);
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedPrice", price);
        model.addAttribute("selectedSort", sort);
        model.addAttribute("searchTerm", search);
        return "courses";
    }

    @GetMapping("/faq")
    public String faq() {
        return "faq";
    }

    @GetMapping("/instructors")
    public String instructors(Model model) {
        model.addAttribute("instructors", instructorService.findAll());
        return "instructors";
    }
}
