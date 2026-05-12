const APP_THEME_KEY = "macourse-theme";
const HOME_PAGE = "home";
const REVEAL_SELECTOR = [
  ".course-card",
  ".stat-card",
  ".instructor-card",
  ".benefit-card",
  ".testimonial-card",
  ".category-card",
  ".stat-item",
  ".live-clock-card",
  ".hero-toggle-panel"
].join(", ");

let revealObserver = null;
let counterObserver = null;
let liveClockTimeoutId = null;
let liveClockRunning = false;

document.addEventListener("DOMContentLoaded", () => {
  markActivePage();
  initSmoothScroll();
  initNavbarDropdowns();
  initThemeToggle();
  initVisibilityToggles();
  initLiveClock();
  initScrollToTop();
  initFormValidation();
  initCoursePreviewButtons();
  initLogoutAction();
  initHomePage();
  initRevealAnimations(document);
  initStatCounters(document);
});

function getCourses() {
  return Array.isArray(window.courses) ? window.courses : [];
}

function getCategories() {
  return Array.isArray(window.categories) ? window.categories : [];
}

function getInstructors() {
  return Array.isArray(window.instructors) ? window.instructors : [];
}

function getTestimonials() {
  return Array.isArray(window.testimonials) ? window.testimonials : [];
}

function markActivePage() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const isActive = href === currentPath || (currentPath === "" && href === "index.html");
    link.classList.toggle("active", isActive);
    link.classList.toggle("is-active", isActive);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initNavbarDropdowns() {
  const navRoots = document.querySelectorAll(".navbar-nav, .nav-list");
  if (navRoots.length === 0) {
    return;
  }

  const categories = getCategories();
  const dropdowns = [
    {
      href: "courses.html",
      items: [
        { label: "Tous les cours", href: "courses.html" },
        { label: "Bestsellers", href: "courses.html?sort=popular" },
        { label: "Cours gratuits", href: "courses.html?price=free" }
      ]
    },
    {
      href: "categories.html",
      items: (categories.length > 0 ? categories.slice(0, 4) : [
        { id: "", name: "Programmation" },
        { id: "", name: "Design" },
        { id: "", name: "Business" },
        { id: "", name: "Marketing" }
      ]).map((category) => ({
        label: category.name,
        href: category.id ? `courses.html?cat=${category.id}` : "categories.html"
      }))
    }
  ];

  navRoots.forEach((navRoot) => {
    dropdowns.forEach((dropdown) => {
      const link = navRoot.querySelector(`a[href="${dropdown.href}"]`);
      if (!link) {
        return;
      }

      const parent = link.closest("li");
      if (!parent || parent.classList.contains("is-enhanced-dropdown")) {
        return;
      }

      parent.classList.add("has-dropdown", "is-enhanced-dropdown");

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "nav-dropdown-trigger";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", `Toggle ${link.textContent.trim()} menu`);
      trigger.innerHTML = '<span aria-hidden="true">&#9662;</span>';

      const menu = document.createElement("div");
      menu.className = "nav-dropdown-menu";

      dropdown.items.forEach((item) => {
        const menuLink = document.createElement("a");
        menuLink.href = item.href;
        menuLink.textContent = item.label;
        menu.appendChild(menuLink);
      });

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = parent.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));

        document.querySelectorAll(".is-enhanced-dropdown").forEach((dropdownParent) => {
          if (dropdownParent === parent) {
            return;
          }

          dropdownParent.classList.remove("is-open");
          const otherTrigger = dropdownParent.querySelector(".nav-dropdown-trigger");
          if (otherTrigger) {
            otherTrigger.setAttribute("aria-expanded", "false");
          }
        });
      });

      parent.appendChild(trigger);
      parent.appendChild(menu);
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".is-enhanced-dropdown")) {
      return;
    }

    document.querySelectorAll(".is-enhanced-dropdown").forEach((dropdownParent) => {
      dropdownParent.classList.remove("is-open");
      const trigger = dropdownParent.querySelector(".nav-dropdown-trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initThemeToggle() {
  const primaryHost = document.querySelector(".navbar .d-flex, .nav-actions");
  const fallbackHost = document.querySelector(".navbar .container-fluid, .nav-shell");
  const themeHost = primaryHost || fallbackHost;
  if (!themeHost || themeHost.querySelector(".theme-toggle")) {
    applyTheme(localStorage.getItem(APP_THEME_KEY) || "light");
    return;
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "button button-secondary button-sm theme-toggle";
  toggle.id = "themeToggle";

  if (primaryHost) {
    themeHost.prepend(toggle);
  } else {
    toggle.classList.add("ms-auto");
    themeHost.appendChild(toggle);
  }

  const savedTheme = localStorage.getItem(APP_THEME_KEY) || "light";
  applyTheme(savedTheme);
  updateThemeToggleLabel(toggle, savedTheme);

  toggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem(APP_THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    updateThemeToggleLabel(toggle, nextTheme);
  });
}

function applyTheme(theme) {
  document.body.classList.toggle("theme-dark", theme === "dark");
}

function updateThemeToggleLabel(button, theme) {
  button.textContent = theme === "dark" ? "Mode clair" : "Mode nuit";
}

function initVisibilityToggles() {
  const toggleButtons = document.querySelectorAll("[data-toggle-target]");
  if (toggleButtons.length === 0) {
    return;
  }

  const syncButtonLabels = (targetId, isHidden) => {
    document.querySelectorAll(`[data-toggle-target="${targetId}"]`).forEach((button) => {
      const showLabel = button.getAttribute("data-toggle-label-show") || "Afficher";
      const hideLabel = button.getAttribute("data-toggle-label-hide") || "Masquer";
      button.textContent = isHidden ? showLabel : hideLabel;
      button.setAttribute("aria-expanded", String(!isHidden));
    });
  };

  toggleButtons.forEach((button) => {
    const targetId = button.getAttribute("data-toggle-target");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) {
      return;
    }

    syncButtonLabels(targetId, target.classList.contains("is-hidden-panel"));

    button.addEventListener("click", () => {
      const isHidden = target.classList.toggle("is-hidden-panel");
      target.setAttribute("aria-hidden", String(isHidden));
      syncButtonLabels(targetId, isHidden);
    });
  });
}

function initLiveClock() {
  const clock = document.getElementById("liveDateTime");
  const toggle = document.getElementById("clockToggle");
  if (!clock || !toggle) {
    return;
  }

  const renderClock = () => {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(now);
  };

  const scheduleNextTick = () => {
    if (!liveClockRunning) {
      return;
    }

    renderClock();
    liveClockTimeoutId = window.setTimeout(scheduleNextTick, 1000);
  };

  const startClock = () => {
    if (liveClockRunning) {
      return;
    }

    liveClockRunning = true;
    toggle.textContent = "Pause Clock";
    scheduleNextTick();
  };

  const stopClock = () => {
    liveClockRunning = false;
    toggle.textContent = "Start Clock";
    if (liveClockTimeoutId) {
      window.clearTimeout(liveClockTimeoutId);
      liveClockTimeoutId = null;
    }
  };

  toggle.addEventListener("click", () => {
    if (liveClockRunning) {
      stopClock();
      return;
    }

    startClock();
  });

  startClock();
}

function initScrollToTop() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "scroll-to-top";
  button.setAttribute("aria-label", "Revenir en haut de la page");
  button.innerHTML = "&#8593;";
  document.body.appendChild(button);

  const toggleVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 420);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
}

function initFormValidation() {
  setupContactForm();
  setupLoginForm();
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactFormStatus");
  if (!form || !status) {
    return;
  }

  const validators = {
    name: (value) => validateRequired(value, "Veuillez entrer votre nom."),
    email: (value) => validateEmail(value),
    subject: (value) => validateRequired(value, "Veuillez ajouter un sujet."),
    message: (value) => validateRequired(value, "Veuillez ecrire votre message.")
  };

  bindValidationEvents(form, validators);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validateFormFields(form, validators);
    if (!isValid) {
      renderFormStatus(status, "Merci de corriger les champs signales avant l'envoi.", "error");
      return;
    }

    renderFormStatus(status, "Merci ! Votre message a ete envoye avec succes.", "success");
    form.reset();
    clearFieldErrors(form);
  });
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  const status = document.getElementById("loginFormStatus");
  if (!form || !status) {
    return;
  }

  const validators = {
    email: (value) => validateEmail(value),
    password: (value) => {
      if (!value.trim()) {
        return "Veuillez entrer votre mot de passe.";
      }

      if (value.trim().length < 8) {
        return "Le mot de passe doit contenir au moins 8 caracteres.";
      }

      return "";
    }
  };

  bindValidationEvents(form, validators);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validateFormFields(form, validators);
    if (!isValid) {
      renderFormStatus(status, "Veuillez verifier vos identifiants.", "error");
      return;
    }

    renderFormStatus(status, "Connexion reussie. Redirection vers votre dashboard...", "success");
    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  });
}

function bindValidationEvents(form, validators) {
  Object.keys(validators).forEach((fieldName) => {
    const field = form.elements.namedItem(fieldName);
    if (!(field instanceof HTMLElement)) {
      return;
    }

    ["input", "blur"].forEach((eventName) => {
      field.addEventListener(eventName, () => {
        validateSingleField(field, validators[fieldName]);
      });
    });
  });
}

function validateFormFields(form, validators) {
  let isValid = true;

  Object.keys(validators).forEach((fieldName) => {
    const field = form.elements.namedItem(fieldName);
    if (!(field instanceof HTMLElement)) {
      return;
    }

    const hasFieldError = Boolean(validateSingleField(field, validators[fieldName]));
    if (hasFieldError) {
      isValid = false;
    }
  });

  return isValid;
}

function validateSingleField(field, validator) {
  const errorMessage = validator(getFieldValue(field));
  const errorNode = getOrCreateErrorNode(field);

  if (errorMessage) {
    field.classList.add("is-invalid-field");
    errorNode.textContent = errorMessage;
    errorNode.hidden = false;
    return errorMessage;
  }

  field.classList.remove("is-invalid-field");
  errorNode.textContent = "";
  errorNode.hidden = true;
  return "";
}

function getFieldValue(field) {
  if ("value" in field) {
    return String(field.value || "");
  }

  return "";
}

function getOrCreateErrorNode(field) {
  const parent = field.parentElement;
  let errorNode = parent ? parent.querySelector(".form-error") : null;

  if (!errorNode && parent) {
    errorNode = document.createElement("div");
    errorNode.className = "form-error";
    errorNode.hidden = true;
    parent.appendChild(errorNode);
  }

  return errorNode;
}

function renderFormStatus(container, message, type) {
  container.textContent = message;
  container.className = `form-status is-${type}`;
}

function clearFieldErrors(form) {
  form.querySelectorAll(".is-invalid-field").forEach((field) => {
    field.classList.remove("is-invalid-field");
  });

  form.querySelectorAll(".form-error").forEach((errorNode) => {
    errorNode.textContent = "";
    errorNode.hidden = true;
  });
}

function validateRequired(value, message) {
  return value.trim() ? "" : message;
}

function validateEmail(value) {
  if (!value.trim()) {
    return "Veuillez entrer votre adresse e-mail.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim()) ? "" : "Veuillez entrer une adresse e-mail valide.";
}

function initCoursePreviewButtons() {
  document.addEventListener("click", (event) => {
    const previewButton = event.target.closest("[data-course-preview]");
    if (!previewButton) {
      return;
    }

    event.preventDefault();
    const courseId = Number(previewButton.getAttribute("data-course-preview"));
    showCourseModal(courseId);
  });
}

function initLogoutAction() {
  document.addEventListener("click", (event) => {
    const logoutButton = event.target.closest('[data-action="logout"]');
    if (!logoutButton) {
      return;
    }

    event.preventDefault();
    window.location.href = "index.html";
  });
}

function initHomePage() {
  if (document.body.dataset.page !== HOME_PAGE) {
    return;
  }

  renderFeaturedCategories();
  renderFeaturedSlider();
  renderTestimonials();
  renderTopInstructors();
  initFeaturedSliderController();
  initRevealAnimations(document);
  initStatCounters(document);
}

function renderFeaturedCategories() {
  const grid = document.getElementById("categoriesGrid");
  if (!grid) {
    return;
  }

  grid.innerHTML = getCategories().slice(0, 8).map((category) => `
    <a href="categories.html?cat=${category.id}" class="category-card">
      <div class="category-icon">${category.icon}</div>
      <h3>${category.name}</h3>
    </a>
  `).join("");
}

function renderFeaturedSlider() {
  const track = document.getElementById("featuredSliderTrack");
  const dots = document.getElementById("featuredSliderDots");
  if (!track || !dots) {
    return;
  }

  const featuredCourses = getCourses().filter((course) => course.featured).slice(0, 9);
  const slides = chunkItems(featuredCourses, 3);

  track.innerHTML = slides.map((slide) => `
    <div class="featured-slide">
      <div class="featured-slide-grid">
        ${slide.map((course) => `
          <article class="course-card">
            <div class="course-header">
              <div class="course-badges">
                ${course.bestSeller ? '<span class="badge badge-bestseller">Bestseller</span>' : ""}
                ${course.free ? '<span class="badge badge-free">Gratuit</span>' : ""}
              </div>
              <div class="course-image">${course.image}</div>
            </div>
            <div class="course-body">
              <p class="course-category">${course.categoryName}</p>
              <h3>${course.title}</h3>
              <p class="course-description">${truncateText(course.description, 100)}</p>
              <div class="course-meta">
                <span class="meta-item">&#11088; ${course.rating} (${course.ratingCount})</span>
                <span class="meta-item">&#128101; ${formatCompactNumber(course.students)}</span>
              </div>
              <div class="course-footer">
                <div class="course-price ${course.free ? "price-free" : ""}">
                  ${course.free ? "Gratuit" : `${course.price}&euro;`}
                </div>
                <div class="course-actions">
                  <a href="course-details.html?id=${course.id}" class="button button-primary button-sm">Details</a>
                  <button type="button" class="button button-secondary button-sm" data-course-preview="${course.id}">Apercu</button>
                </div>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `).join("");

  dots.innerHTML = slides.map((_, index) => `
    <button type="button" class="featured-slider-dot${index === 0 ? " is-active" : ""}" data-slide-index="${index}" aria-label="Voir le groupe ${index + 1}"></button>
  `).join("");
}

function initFeaturedSliderController() {
  const slider = document.getElementById("featuredSlider");
  const track = document.getElementById("featuredSliderTrack");
  const dots = document.getElementById("featuredSliderDots");
  const prev = document.getElementById("featuredPrev");
  const next = document.getElementById("featuredNext");

  if (!slider || !track || !dots || !prev || !next || track.children.length === 0) {
    return;
  }

  let currentIndex = 0;
  let autoAdvanceId = null;

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.querySelectorAll(".featured-slider-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const scheduleAutoAdvance = () => {
    if (autoAdvanceId) {
      window.clearTimeout(autoAdvanceId);
    }

    autoAdvanceId = window.setTimeout(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  };

  const goToSlide = (nextIndex) => {
    const totalSlides = track.children.length;
    currentIndex = (nextIndex + totalSlides) % totalSlides;
    updateSlider();
    scheduleAutoAdvance();
  };

  prev.addEventListener("click", () => goToSlide(currentIndex - 1));
  next.addEventListener("click", () => goToSlide(currentIndex + 1));

  dots.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-slide-index]");
    if (!dot) {
      return;
    }

    goToSlide(Number(dot.getAttribute("data-slide-index")));
  });

  slider.addEventListener("mouseenter", () => {
    if (autoAdvanceId) {
      window.clearTimeout(autoAdvanceId);
    }
  });

  slider.addEventListener("mouseleave", scheduleAutoAdvance);

  updateSlider();
  scheduleAutoAdvance();
}

function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) {
    return;
  }

  grid.innerHTML = getTestimonials().map((testimonial) => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${testimonial.avatar}</div>
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.role}</p>
        </div>
      </div>
      <p class="testimonial-text">"${testimonial.content}"</p>
      <div class="testimonial-rating">${"&#11088;".repeat(Math.max(1, Math.floor(testimonial.rating)))}</div>
    </div>
  `).join("");
}

function renderTopInstructors() {
  const grid = document.getElementById("instructorsGrid");
  if (!grid) {
    return;
  }

  grid.innerHTML = getInstructors().slice(0, 6).map((instructor) => `
    <article class="instructor-card">
      <div class="instructor-avatar">${instructor.avatar}</div>
      <h3>${instructor.name}</h3>
      <p class="instructor-title">${instructor.title}</p>
      <p class="instructor-bio">${truncateText(instructor.bio, 120)}</p>
      <div class="instructor-stats">
        <span>&#128101; ${formatCompactNumber(instructor.studentCount)} etudiants</span>
        <span>&#128218; ${instructor.courses.length} cours</span>
      </div>
      <a href="instructors.html#instructor-${instructor.id}" class="button button-secondary button-sm">Profil Complet</a>
    </article>
  `).join("");
}

function initRevealAnimations(scope) {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px"
    });
  }

  scope.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    if (element.dataset.revealBound === "true") {
      return;
    }

    element.dataset.revealBound = "true";
    revealObserver.observe(element);
  });
}

function initStatCounters(scope) {
  const counters = scope.querySelectorAll("[data-count-value]");
  if (counters.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  if (!counterObserver) {
    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.4
    });
  }

  counters.forEach((counter) => {
    if (counter.dataset.counterBound === "true") {
      return;
    }

    counter.dataset.counterBound = "true";
    counterObserver.observe(counter);
  });
}

function animateCounter(counter) {
  const targetValue = Number(counter.getAttribute("data-count-value"));
  const decimals = Number(counter.getAttribute("data-count-decimals") || "0");
  const suffix = counter.getAttribute("data-count-suffix") || "";
  const format = counter.getAttribute("data-count-format") || "default";
  const duration = 1400;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = targetValue * eased;
    counter.textContent = formatCounterValue(currentValue, { decimals, suffix, format });

    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }

    counter.textContent = formatCounterValue(targetValue, { decimals, suffix, format });
  };

  window.requestAnimationFrame(tick);
}

function formatCounterValue(value, options) {
  const roundedValue = options.decimals > 0
    ? value.toFixed(options.decimals)
    : String(Math.round(value));

  if (options.format === "compact") {
    return formatCompactNumber(value);
  }

  return `${roundedValue}${options.suffix}`;
}

function formatCompactNumber(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M+`;
  }

  if (value >= 1000) {
    return `${Math.round(value / 1000)}K+`;
  }

  return `${Math.round(value)}`;
}

function chunkItems(items, size) {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function truncateText(text, limit) {
  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trimEnd()}...`;
}

function getCourseById(id) {
  return getCourses().find((course) => course.id === id);
}

function showCourseModal(courseId) {
  const course = getCourseById(courseId);
  const modalElement = document.getElementById("courseModal");
  const modalBody = document.getElementById("courseModalBody");
  const modalLink = document.getElementById("courseModalLink");

  if (!course || !modalElement || !modalBody || !modalLink || !window.bootstrap) {
    return;
  }

  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <div class="course-image mb-3">${course.image}</div>
        ${course.bestSeller ? '<span class="badge badge-bestseller mb-2">Bestseller</span>' : ""}
        ${course.free ? '<span class="badge badge-free mb-2">Gratuit</span>' : ""}
      </div>
      <div class="col-md-8">
        <h4>${course.title}</h4>
        <p class="text-muted">${course.categoryName} &#8226; ${course.level}</p>
        <p>${course.description}</p>
        <div class="mb-3">
          <strong>&#11088; ${course.rating} (${course.ratingCount} avis)</strong><br>
          <strong>&#128101; ${formatCompactNumber(course.students)} etudiants</strong><br>
          <strong>&#9200; ${course.duration}</strong><br>
          <strong>&#128218; ${course.lessons} lecons</strong>
        </div>
        <div class="mb-3">
          <h5>Objectifs d'apprentissage :</h5>
          <ul>
            ${course.objectives.map((objective) => `<li>${objective}</li>`).join("")}
          </ul>
        </div>
        <div class="course-price">${course.free ? "Gratuit" : `${course.price}&euro;`}</div>
      </div>
    </div>
  `;

  modalLink.href = `course-details.html?id=${course.id}`;
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}
