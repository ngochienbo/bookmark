/***********************************************
Global variables
***********************************************/

var h = []; //array for <p> elements' heights in FAQ section
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

})