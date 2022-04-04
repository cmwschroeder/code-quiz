//Grabs references to elements in the html file
var timerEl = document.getElementById("timer");
var startEl = document.querySelector("#start");
var introEl = document.querySelector("#intro");
var quizEl = document.querySelector("#quiz-questions");
var endGame = document.querySelector("#end-game");
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var subButtonEl = document.querySelector("#submit");
var highscoreEl = document.querySelector("#highscores");
var highscoreListEl = document.querySelector("#entered-highscores");

var questNumEl = document.querySelector("#questions-asked");
var questEl = document.querySelector("#question");
var ans1El = document.querySelector("#ans-one");
var ans2El = document.querySelector("#ans-two");
var ans3El = document.querySelector("#ans-three");
var ans4El = document.querySelector("#ans-four");
var restartButton = document.querySelector("#restart");
var clearButton = document.querySelector("#clear");

var questionsAsked;
var score = 0;
var correctAns;
var unusedButtons = [];
var gameOn = false;
var timeLeft;

var allScores = [];

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
        incorrectAnswer: ["Hyperload Markup Language", "Howtoload Markup Language", "None of these"]
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
        incorrectAnswer: ["x", "j", "a"]
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

var currentQuiz = [];

function countdown() {
    var timeInterval = setInterval(function() {
        if(gameOn && timeLeft >= 1) {
            timerEl.textContent = "Timer: " + timeLeft;
        } else if(gameOn) {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
            gameOver();
        }
        else {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
        }
        timeLeft--;
    }, 1000);
};

startEl.addEventListener("click", function() {
    timeLeft = 10;
    questionsAsked = 0;
    currentQuiz = quiz;
    gameOn = true;
    introEl.setAttribute("style", "display: none;");
    quizEl.setAttribute("style", "display: flex");
    selectQuestion();
    countdown();
});

function selectQuestion() {
    unusedButtons = [1, 2, 3, 4];
    questionsAsked++;
    var selected = Math.floor(Math.random() * currentQuiz.length);

    questNumEl.textContent = ("Question: " + questionsAsked);
    questEl.textContent = currentQuiz[selected].question;

    // selects a random answer choice and sets that as the correct Answer, passes
    //to setButton to set the text for that button
    var selButton = Math.floor(Math.random() * unusedButtons.length);
    correctAns = unusedButtons[selButton];
    setButton(currentQuiz[selected].correctAnswer, unusedButtons[selButton]);
    unusedButtons.splice(selButton, 1);

    for(var i = 0; i < 3; i++) {
        selButton = selButton = Math.floor(Math.random() * unusedButtons.length);
        setButton(currentQuiz[selected].incorrectAnswer[i], unusedButtons[selButton]);
        unusedButtons.splice(selButton, 1);
    }

    currentQuiz.splice(selected, 1);
};

// sets the text content for the button that is passed in
function setButton(answer, buttonNum) {
    if(buttonNum === 1) {
        ans1El.textContent = answer;
    } else if(buttonNum === 2) {
        ans2El.textContent = answer;
    } else if(buttonNum === 3) {
        ans3El.textContent = answer;
    } else {
        ans4El.textContent = answer;
    }
}

ans1El.addEventListener("click", function() {
    gradeQuestion(1);
});

ans2El.addEventListener("click", function() {
    gradeQuestion(2);
});

ans3El.addEventListener("click", function() {
    gradeQuestion(3);
});

ans4El.addEventListener("click", function() {
    gradeQuestion(4);
});

function gradeQuestion(answer) {
    if(correctAns == answer) {
        score++;
    } else {
        timeLeft = timeLeft - 10;
    };

    if(currentQuiz.length != 0) {
        selectQuestion();
    } else {
        gameOn = false;
        gameOver();
    }
};

function gameOver() {
    quizEl.setAttribute("style", "display: none");
    scoreEl.textContent = ("Score: " + score);
    endGame.setAttribute("style", "display: flex");
};

subButtonEl.addEventListener("click", function() {
    if(initialsEl.value != "") {
        var newInitials = initialsEl.value;
        addToHighscore(newInitials);
        initialsEl.value = "";
        endGame.setAttribute("style", "display: none");
        displayHighscore();
    } else {
        alert("Please enter some text");
    };
});


/*
 * Stores the new score being added into the local Storage
 */
function addToHighscore(newInitials) {
    var newScore = {
        highscore: score,
        initials: newInitials
    };
    var toStore = JSON.parse(localStorage.getItem('pastScores'));
    if(toStore == null) {
        toStore = [];
    }
    if(toStore.length == 0) {
        toStore[0] = newScore;
    } else {
        toStore[toStore.length] = newScore;
    }
    localStorage.setItem("pastScores", JSON.stringify(toStore));
};

/*
 * This is what builds the list that displays the highscore list to the user
 */
function displayHighscore() {
    // First make sure the list is empty so that if this isn't the first time called then we don't have a duplicate list
    highscoreListEl.innerHTML = "";

    //now we get the list of scores from the local storage
    var currentListScore = JSON.parse(localStorage.getItem("pastScores"));

    //run through a for loop getting each past score and making a li to add to ul
    for(var i = 0; i < currentListScore.length; i++) {
        highscoreListEl.appendChild(buildLi(currentListScore[i].initials, currentListScore[i].highscore, (i + 1)));
    }

    //display the highscore section to the user
    highscoreEl.setAttribute("style", "display: flex");
};


/*
 * This will return a new li that we can add to the list
 */
function buildLi(initials, highscore, spot) {
    var li = document.createElement("li");
    li.textContent = (spot + ". " + initials + " - " + highscore);
    return li;
}

/*
 * Clears the local storage of past scores
 */
clearButton.addEventListener("click", function() {
    //sets up an empty array and sets past scores to that empty array
    var emptyArray = [];
    localStorage.setItem("pastScores", JSON.stringify(emptyArray));
    displayHighscore();
});