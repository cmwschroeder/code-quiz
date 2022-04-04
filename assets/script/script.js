//Grabs references to elements in the html file
var timerEl = document.getElementById("timer");
var startEl = document.querySelector("#start");
var introEl = document.querySelector("#intro");
var quizEl = document.querySelector("#quiz-questions");
var endGame = document.querySelector("#end-game");
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var highscoreEl = document.querySelector("#highscores");
var highscoreListEl = document.querySelector("#entered-highscores");
var questNumEl = document.querySelector("#questions-asked");

//variables that hold info on the buttons
var questEl = document.querySelector("#question");
var ans1El = document.querySelector("#ans-one");
var ans2El = document.querySelector("#ans-two");
var ans3El = document.querySelector("#ans-three");
var ans4El = document.querySelector("#ans-four");
var subButtonEl = document.querySelector("#submit");
var restartButton = document.querySelector("#restart");
var clearButton = document.querySelector("#clear");
var displayHighscoresButton = document.querySelector("#display");

//variables that will hold info used in the logic of the quiz
//and displaying the highscores
var questionsAsked;
var score = 0;
var correctAns;
var unusedButtons = [];
var gameOn = false;
var timeLeft;

// An array of objects that hold the questions and answers as well as wrong answers for the quiz
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

//variable to hold the quiz so that we can remove quiz questions that have been asked
var currentQuiz = [];

/*
 * Handles the timer for the quiz
 */
function countdown() {
    var timeInterval = setInterval(function() {
        //counts down if the game is ongoing and the timer still has time left
        if(gameOn && timeLeft >= 1) {
            timerEl.textContent = "Timer: " + timeLeft;
        }
        //if the game is still going but the timer has run out then we will end the game 
        else if(gameOn) {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
            gameOn = false;
            gameOver();
        }
        // sets the timer to 0 because we have run out of questions and the game is over
        else {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
        }
        timeLeft--;
    }, 1000);
};

/*
 * Starts the quiz, handles all the logic that needs to be reset at game start, as well
 * hides the intro section and displays the quiz section. Selects a question and begins countdown
 */
startEl.addEventListener("click", function() {
    //time that is given to take the quiz
    timeLeft = 30;
    questionsAsked = 0;
    //copies the quiz questions into a different array of objects so that we can have
    //multiple quizzes without reloading the page
    for(var i = 0; i < quiz.length; i++) {
        currentQuiz[i] = quiz[i];
    }
    gameOn = true;
    score = 0;
    introEl.setAttribute("style", "display: none;");
    quizEl.setAttribute("style", "display: flex");
    selectQuestion();
    countdown();
});

/*
 * Selects a question from the quiz questions, populates the buttons randomly so that
 * the answers will not be in the same spot when the question is asked multiple times
 */
function selectQuestion() {
    unusedButtons = [1, 2, 3, 4];
    questionsAsked++;
    //Selets a random question from the remaining questions
    var selected = Math.floor(Math.random() * currentQuiz.length);

    questNumEl.textContent = ("Question: " + questionsAsked);
    questEl.textContent = currentQuiz[selected].question;

    // selects a random answer choice and sets that as the correct Answer, passes
    //to setButton to set the text for that button
    var selButton = Math.floor(Math.random() * unusedButtons.length);
    correctAns = unusedButtons[selButton];
    setButton(currentQuiz[selected].correctAnswer, unusedButtons[selButton]);
    unusedButtons.splice(selButton, 1);

    //randomly populates the rest of the buttons with the wrong answers
    for(var i = 0; i < 3; i++) {
        selButton = selButton = Math.floor(Math.random() * unusedButtons.length);
        setButton(currentQuiz[selected].incorrectAnswer[i], unusedButtons[selButton]);
        unusedButtons.splice(selButton, 1);
    }

    //removes question from quiz questions so that it can't be asked again
    currentQuiz.splice(selected, 1);
};

/*
 * sets the text content for the button that is passed in
 */
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

/*
 * Event listeners for the buttons, sends the grade question
 * function the info telling what button was pressed
 */
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

/*
 * Checks if the question was answered correctly or incorrectly, calls the select question
 * function if there are more questions to pick from, if not then it will end the game
 */
function gradeQuestion(answer) {
    //checks if question was answered correctly, if it was then increment score, if not
    //minus time from the timer
    if(correctAns == answer) {
        score++;
    } else {
        timeLeft = timeLeft - 10;
    };

    //ends game if there are no questions left
    if(currentQuiz.length != 0) {
        selectQuestion();
    } else {
        gameOn = false;
        gameOver();
    }
};

/*
 * Displays the end of the game screen that shows score and allows you to put in your initals to save your highscore
 */
function gameOver() {
    quizEl.setAttribute("style", "display: none");
    scoreEl.textContent = ("Score: " + score);
    endGame.setAttribute("style", "display: flex");
};

/*
 * Handles the grabbing of the initials and passes it to the store highscore function
 * hides the end game section and displays highscores
 */
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
    var stored = false;
    //create an object that will hold the current highscore being added
    var newScore = {
        highscore: score,
        initials: newInitials
    };
    // get the array of objects that hold past highscores
    var toStore = JSON.parse(localStorage.getItem('pastScores'));

    //if the user has never played then we need to create a local variable for them
    if(toStore == null) {
        toStore = [];
    }

    // if we have no scores then we don't need to store based on highest score
    if(toStore.length == 0) {
        toStore[0] = newScore;
        stored = true;
    }
    // We do have scores so we need to put this highscore in the spot that makes the most sense 
    else {
        for(var i = 0; i < toStore.length; i++) {
            if(toStore[i].highscore < newScore.highscore && !stored) {
                toStore.splice(i, 0, newScore);
                stored = true;
            }
        }
        if(!stored) {
            toStore[toStore.length] = newScore;
        }
    }
    //store the new score list in local storage
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

    //in case we are trying to display highscores for someone that has never played the code quiz yet
    if(currentListScore == null) {
        currentListScore = [];
    }

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

/*
 * Will restart the quiz at the beginning
 */
restartButton.addEventListener("click", function() {
    highscoreEl.setAttribute("style", "display: none");
    introEl.setAttribute("style", "display: flex;");
});

/*
 * Will end the game if it is on, hide everything but the highscores
 */
displayHighscoresButton.addEventListener("click", function() {
    introEl.setAttribute("style", "display: none;");
    endGame.setAttribute("style", "display: none");
    highscoreEl.setAttribute("style", "display: flex");
    quizEl.setAttribute("style", "display: none");
    gameOn = false;
    displayHighscore();
});