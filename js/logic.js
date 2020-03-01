//variables
var timerEl = document.getElementById("timer");
var homeScreen = document.getElementById("card-1");
var questionCard = document.getElementById("question-card");
var responseEl = document.getElementById("response-alert");
var gameOverScreen = document.getElementById("game-over-screen");
var gameOverH3 = document.getElementById("game-over");
var scoreText = document.getElementById("score-text");
var initialsInput = document.getElementById("initials");

var startBtn = document.getElementById("start");
var btnSaveScore = document.getElementById("btn-initials");
var listBtnAnswer = document.querySelectorAll(".btn-answer")

var questionEl = document.getElementById("question");
var questionNumber = 0;
var timeLeft = 60;
var timerId; 

//presenting the question, choices, and answer
var questionArray = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
    answer: "<script>"
}, {
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
    answer: "if (i == 5)"
}, {
    title: "How do you round the number 7.25, to the nearest integer?",
    choices: [
        "Math.round(7.25)",
        "Math.rnd(7.25)",
        "round(7.25)",
        "rnd(7.25)"
    ],
    answer: "Math.round(7.25)"
}, {
    title: "How does a FOR loop start?",
    choices: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
}, {
    title: "Which operator is used to assign a value to a variable?",
    choices: ["=", "-", "*", "X"],
    answer: "="
}];

//check answers. if answer is incorrect, take away 5 seconds
function questionChecker(answer) {
    console.log(answer);
    if (questionArray[questionNumber].choices[answer] !== questionArray[questionNumber].answer) {
        timeLeft -= 5;
        timerEl.textContent = timeLeft + " seconds remaining";
    }
    if (timeLeft === 0 || timeLeft < 0) {
        timerEl.textContent = "";
        clearInterval(timerId);
        gameOver();
    }
    questionNumber++
    if (questionNumber === questionArray.length) {
        gameOver()
    } else {
        loadQuestion()
    }
}

//game over function
function gameOver() {
    clearInterval(timerId);
    gameOverScreen.style.display = "block";
    questionCard.style.display = "none";
    gameOverH3.innerHTML = "Game Over!";
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    scoreText.textContent = "Your score is " + timeLeft;

}

//save the high score
function saveHighScore() {
    

    var newHighScore = {
        score: timeLeft,
        initials: initialsInput.value
    }

    var highScoreArray = JSON.parse(localStorage.getItem("highScores") || "[]")

    highScoreArray.push(newHighScore)
    localStorage.setItem("highScores", JSON.stringify(highScoreArray));

    window.location.href = "highscores.html";

}

//timer for quiz
function dynamicTimer() {
    timerId = setInterval(function() {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;
        homeScreen.style.display = "none"; 
        questionCard.style.display = "block";

        if (timeLeft === 0) {
            timerEl.textContent = "";
            gameOver();
        }

    }, 1000);
}

//load the questions
function loadQuestion() {
    questionEl.textContent = questionArray[questionNumber].title;
    for (var i = 0; i < questionArray[questionNumber].choices.length; i++) {
        var answerButton = document.querySelector("#answerBtn" + i);
        answerButton.setAttribute("onclick", "questionChecker(" + i + ")");
        answerButton.textContent = questionArray[questionNumber].choices[i];
    }
}

//start the quiz and timer
function startQuiz() {
    dynamicTimer();
    loadQuestion();
}

//click event listeners
startBtn.addEventListener("click", startQuiz);
btnSaveScore.addEventListener("click", saveHighScore);