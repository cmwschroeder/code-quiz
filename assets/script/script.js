//Grabs references to elements in the html file
var timerEl = document.getElementById("timer");
var startEl = document.querySelector("#start");
var introEl = document.querySelector("#intro");


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
    countdown();
});

function displayHighscore() {

};