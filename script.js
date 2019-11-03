/***********************************************
Global variables
***********************************************/

var h = []; //array for <p> elements' heights in FAQ section
var currentOpen = 0; //index of the currently open answer

/***********************************************
Preload script
***********************************************/

window.addEventListener('load', function() {
    document.querySelector('body').classList.remove('preload');

    // Getting heights of <p> elements in FAQ section, needed for transition animation
    // which won't work with auto or initial height
    var questionCount = document.querySelector(".faq-questions").childElementCount;
    console.log(questionCount);
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
        var questionChosen = document.querySelector('.faq-question' + (i + 1));
        var answerChosen = document.querySelector('.faq-answer' + (i + 1));
        var answerOpen = document.querySelector('.faq-answer' + currentOpen);
        var questionOpen = document.querySelector('.faq-question' + currentOpen);
        var open = function() {
            answerChosen.style.height = h[i] + 'px';
            answerChosen.style.transition = 'height 1s';
            answerChosen.style.visibility = 'initial';
            answerChosen.style.position = 'initial';
            questionChosen.classList.toggle('faq-open');
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
        else if (questionChosen.classList.contains('faq-open')) {
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