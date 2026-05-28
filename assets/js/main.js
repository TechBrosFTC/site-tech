// Interações leves do site: navbar compacta, revelação suave e ano automático.
(function () {
  "use strict";

  const navbar = document.querySelector(".game-navbar");
  const yearTargets = document.querySelectorAll("[data-current-year]");
  const revealTargets = document.querySelectorAll(".reveal-on-scroll");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 12);
  }

  function fillCurrentYear() {
    const year = new Date().getFullYear();
    yearTargets.forEach((target) => {
      target.textContent = year;
    });
  }

  function setupReveal() {
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }

  function closeMobileMenuOnClick() {
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link, .navbar-collapse .dropdown-item");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;
        const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        collapse.hide();
      });
    });
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    fillCurrentYear();
    setupReveal();
    closeMobileMenuOnClick();
  });
})();
