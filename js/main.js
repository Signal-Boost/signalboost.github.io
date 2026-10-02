/* =====================================================================
   main.js — Small bits of interactivity shared by every page.
   ---------------------------------------------------------------------
   JavaScript makes a page DO things (respond to clicks, scrolling...).
   Each HTML page loads this file with:
       <script src="js/main.js" defer></script>
   "defer" tells the browser to run it only after the HTML has loaded,
   so all the elements below already exist when this code runs.

   Lines starting with // are comments (ignored by the browser).

   This file does 4 things:
     1. Opens/closes the mobile menu (hamburger button)
     2. Highlights the nav link for the page you're currently on
     3. Puts the current year in the footer automatically
     4. Fades sections in as you scroll down
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   --------------------------------------------------------------------- */

// Find the header and the hamburger button on the page.
// document.querySelector("...") uses the same selectors as CSS.
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

// Only run this if the button exists (safety check).
if (header && navToggle) {
  // "addEventListener('click', ...)" = "when this is clicked, run this function"
  navToggle.addEventListener("click", function () {
    // classList.toggle adds the class "open" if missing, removes it if present.
    // It returns true if the class is now on, false if it's now off.
    const isOpen = header.classList.toggle("open");

    // Tell screen readers whether the menu is expanded (accessibility).
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu when any link inside it is clicked.
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* ---------------------------------------------------------------------
   2. HIGHLIGHT THE CURRENT PAGE IN THE NAV
   ---------------------------------------------------------------------
   Example: on about.html, the "About" link gets class="active",
   which styles.css underlines in orange.
   --------------------------------------------------------------------- */

// window.location.pathname is the part of the URL after the domain,
// e.g. "/about.html" or "/signalboost-site/about.html" or just "/".
// .split("/").pop() grabs the last piece, e.g. "about.html".
// If it's empty (the home page "/"), we treat it as "index.html".
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(function (link) {
  // getAttribute("href") reads what the link points to, e.g. "about.html"
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");              // Style it as active
    link.setAttribute("aria-current", "page"); // Tell screen readers too
  }
});


/* ---------------------------------------------------------------------
   3. AUTOMATIC COPYRIGHT YEAR
   ---------------------------------------------------------------------
   In the footer HTML there is: <span id="year"></span>
   This fills it with the current year so you never have to update it.
   --------------------------------------------------------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear(); // e.g. 2026
}


/* ---------------------------------------------------------------------
   4. FADE-IN ON SCROLL
   ---------------------------------------------------------------------
   Any element with class="reveal" starts hidden (see styles.css).
   An "IntersectionObserver" watches those elements and tells us when
   they enter the screen; we then add class="visible" to fade them in.
   --------------------------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

// Older browsers may not support IntersectionObserver — if so, just show everything.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // isIntersecting = true when the element is on screen
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Trigger the CSS fade-in
          observer.unobserve(entry.target);      // Stop watching — only animate once
        }
      });
    },
    { threshold: 0.12 } // Fire when ~12% of the element is visible
  );

  // Start watching every .reveal element
  revealElements.forEach(function (el) {
    observer.observe(el);
  });
} else {
  revealElements.forEach(function (el) {
    el.classList.add("visible");
  });
}
