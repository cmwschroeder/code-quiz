//Grabs references to elements in the html file
var timerEl = document.getElementById("timer");
var startEl = document.querySelector("#start");
var introEl = document.querySelector("#intro");

var quizEl = document.querySelector("#quiz-questions");
var questEl = document.querySelector("#question");
var ans1El = document.querySelector("#ans-one");
var ans2El = document.querySelector("#ans-two");
var ans3El = document.querySelector("#ans-three");
var ans4El = document.querySelector("#ans-four");

var score = 0;
var correctAns;


var quiz = [
    {
        question: "Which tag would you use to redirect the user to another page when clicked?",
        correctAnswer: "a",
        incorrectAnswer: ["p", "link", "ul"]
    },
    {
        question: "Which attribute would you use to round the corners of an element?",
        correctAnswer: "border-radius",
        incorrectAnswer: ["transformation", "transition", "border"]
    },
    {
        question: "What does CSS stand for?",
        correctAnswer: "Cascading Style Sheets",
        incorrectAnswer: ["Controlling Style Segment", "Conforming Style Script", "Collapsing Style Segment"]
    },
    {
        question: "What does HTML stand for?",
        correctAnswer: "Hypertext Markup Language",
        incorrectAnswer: ["Hyperload Markup Language", "Howtoload Markup Language", "None of the above"]
    },
    {
        question: "What tag would you use to attach a stylesheet to the HTML page?",
        correctAnswer: "link",
        incorrectAnswer: ["style", "script", "css"]
    },
    {
        question: "Which property would you use to change the text color of an element?",
        correctAnswer: "color",
        incorrectAnswer: ["text-color", "background-color", "font-color"]
    },
    {
        question: "When will a while loop stop?",
        correctAnswer: "When the condition becomes false",
        incorrectAnswer: ["When the condition is true", "When the iterator reaches a certain number", "When we call while.stop"]
    },
    {
        question: "What letter is most commonly used as the iterator in a for loop?",
        correctAnswer: "i",
        inccorrectAnswer: ["x", "j", "a"]
    },
    {
        question: "What does || mean in a conditional statement?",
        correctAnswer: "or",
        incorrectAnswer: ["and", "between", "absolute value"]
    },
    {
        question: "Why do we use the alt attribute in img tags?",
        correctAnswer: "If for whatever reason the user can't see the image, we can explain in words",
        incorrectAnswer: ["So that the image has background text", "For the programmer to know what the image is about", "For styling purposes"]
    }
];


var timeLeft = 60;

function countdown() {
    var timeInterval = setInterval(function() {
        if(timeLeft >= 1) {
            timerEl.textContent = "Timer: " + timeLeft;
        }
        else {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
        }
        timeLeft--;
    }, 1000);
    displayHighscore();
};

startEl.addEventListener("click", function() {
    introEl.setAttribute("style", "display: none;");
    quizEl.setAttribute("style", "display: flex");
    selectQuestion();
    countdown();
});

function selectQuestion() {

}

function displayHighscore() {

};