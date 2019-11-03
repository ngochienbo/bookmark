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

// Features Section
// - Switch between different Features tabs

// Currently active tab, by default at page load it's tab 1
var curTabNum = 1;

var menu = document.querySelector(".features-menu");
menu.addEventListener("click", function(ev) {
  // Determine which tab was clicked and switch to it
  var target = ev.target;
  var listItems = target.parentNode.children;
  var targetID = Array.prototype.indexOf.call(listItems, target);
  var newTabNum = targetID + 1;
});
