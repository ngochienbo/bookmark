window.addEventListener("load", function() {
    document.querySelector("body").classList.remove("preload");
});

// Navbar Section
// Toggle hamburger menu in mobile view
var hamburger = document.querySelector(".navbar-hamburger");

hamburger.addEventListener("click", function() {
  var navbar = document.querySelector(".navbar");

  navbar.classList.toggle("active");
  toggleBlur();

  // Toggle blur on all sections other than the Navbar section
  function toggleBlur() {
    var sections = document.querySelector(".body-wrapper").children;

    Array.prototype.forEach.call(sections, function(section) {
      if (!section.classList.contains("navbar")) {
        section.classList.toggle("blur");
      }
    });
  };
});

