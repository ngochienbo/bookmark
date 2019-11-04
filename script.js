/***********************************************
Global variables
***********************************************/

var h = []; //array for <p> elements' heights in FAQ section
var currentOpen = 0; //index of the currently open answer

// Currently active tab, by default at page load it's tab 1
var curTabNum = 1;


/***********************************************
Preload script
***********************************************/

window.addEventListener('load', function() {
    document.querySelector('body').classList.remove('preload');

    // Getting heights of <p> elements in FAQ section, needed for transition animation
    // which won't work with auto or initial height
    var questionCount = document.querySelector(".faq-questions").childElementCount;
    for (var i = 0; i < questionCount; i++) {
        var answer = document.querySelector('.faq-answer' + (i + 1));
        h[i] = answer.clientHeight;

        // After obtaining height for a <p> set it to be 0 height to hide it
        answer.style.height = '0px';
        answer.style.transition = 'height 1s';
        answer.style.visibility = 'initial';
        answer.style.position = 'initial';
    }
    return h
})

/***********************************************
FAQ section - opening and closing answer
***********************************************/

document.querySelector('.faq-questions').addEventListener('click', function(e) {

    // Check if clicked element is actually <h5>
    if (e.target.parentNode.parentNode === e.currentTarget) {
        var x = e.target.parentNode.parentNode.children;
        var i = Array.prototype.indexOf.call (x, e.target.parentNode);  // Using Array's indexOf method on a nodelist
        var questionCurrent = document.querySelector('.faq-question' + (i + 1));
        var answerCurrent = document.querySelector('.faq-answer' + (i + 1));
        var answerOpen = document.querySelector('.faq-answer' + currentOpen);
        var questionOpen = document.querySelector('.faq-question' + currentOpen);
        var open = function() {
            answerCurrent.style.height = h[i] + 'px';
            answerCurrent.style.transition = 'height 1s';
            answerCurrent.style.visibility = 'initial';
            answerCurrent.style.position = 'initial';
            questionCurrent.classList.toggle('faq-open');
        }
        var close = function() {
            answerOpen.style.height = '0px';
            answerOpen.style.transition = 'height 1s';
            answerOpen.style.visibility = 'initial';
            answerOpen.style.position = 'initial';
            questionOpen.classList.toggle('faq-open');
        }
        
        // 1. Open an answer with all answers closed
        if (currentOpen === 0) {
            open();
            currentOpen = i + 1;
        } 
        
        // 2. Close an already open answer
        else if (questionCurrent.classList.contains('faq-open')) {
            close();
            currentOpen = 0;
        } 
        
        // 3. Open an answer with another answer already open, which will be closed
        else {
            close();
            open();
            currentOpen = i + 1;
        }
    }
})

/***********************************************
Newsletter section - email input validation
***********************************************/

document.querySelector('#email').addEventListener('click', function(e) {
    var selector = document.querySelector('input');
    var input = selector.value;

    //Regex for email address validation
    var validator = /^[^`!@#$%*=:;'",/\n\r\t ]*@[^`!@#$%*=:;'",/ \n\r\t]*\.[^`!@#$%*=:;'",/\n\r\t ]{2,3}$/g;

    //Regex test method does not work correctly, using search method for string works fine though
    if (input.search(validator) === -1 ) {
        selector.parentNode.classList.add('invalid-email');
        
        //Stop button from submitting form if email invalid
        e.preventDefault();
    } else {
        selector.parentNode.classList.remove('invalid-email');
    }
})

/**************************************
Navbar Section
**************************************/

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

/**************************************
Features Section
**************************************/

var menu = document.querySelector(".features-menu");
menu.addEventListener("click", function(ev) {
  // Determine which tab was clicked and switch to it
  var target = ev.target;
  var listItems = target.parentNode.children;
  var targetID = Array.prototype.indexOf.call(listItems, target);
  var newTabNum = targetID + 1;

  switchTabs(newTabNum, listItems);
});

// Switch to the new tab and complete all necessary transitions
function switchTabs(newTabNum, listItems) {
  if (newTabNum !== curTabNum) {
    switchToTab(newTabNum);
    switchHighlight(newTabNum, listItems);

    curTabNum = newTabNum;
  }

  // Show new tab, hide old tab
  function switchToTab(newTabNum) {
    var curTab = document.querySelector(".features-tab" + curTabNum);
    var newTab = document.querySelector(".features-tab" + newTabNum);

    // disable current tab and enable selected tab

    curTab.style.transition = "opacity 0.5s";
    curTab.style.opacity = 0;
    curTab.style.zIndex = 1;

    newTab.style.transition = "opacity 0.2s";
    newTab.style.opacity = 1;
    newTab.style.zIndex = 2;
  }

  // Display new highlight and hide old one in the menu list
  function switchHighlight(newTabNum, listItems) {
    if (newTabNum !== curTabNum) {
      // Get current and new HL objects
      var curListItem = listItems[curTabNum-1];
      var curHL = curListItem.children[0];
      var HLWidth = window.getComputedStyle(curHL).width;

      var newListItem = listItems[newTabNum-1];
      var newHL = newListItem.children[0];

      // Apply transition effect
      curHL.style.width = 0 + "px";
      newHL.style.width = HLWidth;
    }
  }
}


