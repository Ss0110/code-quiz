var question1 = [
  "What tag is used to define the bottom section of an HTML document?:",
  "<footer>",
  "<td>",
  "<h1> to <h6>",
  "<button>",
];
var question2 = [
  "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
  "<code>",
  "<!DOCTYPE>",
  "<embed>",
  "<caption>",
];
var question3 = [
  "Arrays in Javascript can be used to store ____.",
  "numbers and strings",
  "other arrays",
  "booleans",
  "all of the above",
];
var question4 = [
  "What tag can be used to insert a line break or blank line in an HTML document?",
  "<br>",
  "<tk>",
  "<head>",
  "<title>",
];
var question5 = [
  "A very useful tool used during development and debugging for printing content to the debugger is ____:",
  "Javascript",
  "terminal/bash",
  "for loops",
  "console log",
];
// put all question+answer arrays into single array to iterate through arrays
var totalList = [question1, question2, question3, question4, question5];
var timer = document.querySelector("#timer");
var secondsRemaining = timer.getAttribute("data-seconds");
var questionInput = document.querySelector("#question-box");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var container = document.querySelector("#container");
var timerVisible = document.querySelector("#time-remaining");
var saveScore = document.querySelector("#save-score");
var finalScoreEl = document.querySelector("#final-score");
var startButton = document.querySelector("#start");
var leaderboard = document.querySelector("#leaderboard");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var resestBtn = document.querySelector("#reset-scores");
var initialsColumn = document.querySelector("#initials-column");
var scoresColumn = document.querySelector("#scores-column");
var answerCounter = 0;
// set array equal to answer positions based on question order
var correctAnswers = [
  "#answer1",
  "#answer2",
  "#answer4",
  "#answer1",
  "#answer4",
];
var score = 0;

// hidden elements when they are not needed
container.style.visibility = "hidden";
timerVisible.style.visibility = "hidden";
saveScore.style.display = "none";
leaderboard.style.display = "none";

// function begins quiz, shows related elements
document.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("#start")) {
    startTimer();
    inputQuestion();
    container.style.visibility = "visible";
    timerVisible.style.visibility = "visible";
    startButton.style.display = "none";
  }
});

// starts timer, takes 10 seconds off for wrong answer. clears timer when last question is answered
function startTimer() {
  secondsLeft = parseInt(timer.getAttribute("data-seconds"));
  var timeInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timeInterval);
      youLost();
    } else if (answerCounter === 8) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

// inputs next question/answers. once final question is answered, youWin fuction is called
function nextQuestion() {
  if (answerCounter < 8) {
    questionInput.textContent = totalList[answerCounter][0];
    answer1.textContent = totalList[answerCounter][1];
    answer2.textContent = totalList[answerCounter][2];
    answer3.textContent = totalList[answerCounter][3];
    answer4.textContent = totalList[answerCounter][4];
  } else {
    youWin();
  }
}

// inputs initial question, listens for correct answer to increase answer counter
function inputQuestion() {
  questionInput.textContent = question1[0];
  answer1.textContent = question1[1];
  answer2.textContent = question1[2];
  answer3.textContent = question1[3];
  answer4.textContent = question1[4];
  container.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches(correctAnswers[answerCounter])) {
      answerCounter = answerCounter + 1;
      nextQuestion();
    } else {
      secondsLeft = secondsLeft - 10;
    }
  });
}

// hides elements and prompts user to refresh to try again
function youLost() {
  questionInput.textContent = "You lost. Refresh page to try again.";
  answer1.style.display = "none";
  answer2.style.display = "none";
  answer3.style.display = "none";
  answer4.style.display = "none";
  timerVisible.style.display = "none";
}

// pulls a final score and hides elements
function youWin() {
  var finalScore = secondsLeft;
  container.style.display = "none";
  timerVisible.style.display = "none";
  saveScore.style.display = "block";
  finalScoreEl.textContent = finalScore;
}

// stores initals and scores into local storage. pulls all local storage and puts keys/values into respective list items. appends list items to leaderboard lists.
function scoreSubmit() {
  saveScore.style.display = "none";
  // secondsLeft + 1 equals actual score because of slight delay for clearing the timer
  localStorage.setItem(initials.value, secondsLeft + 1);
  leaderboard.style.display = "block";
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    var listItemInitials = document.createElement("li");
    var listItemScores = document.createElement("li");
    listItemInitials.textContent = key;
    listItemScores.textContent = value;
    initialsColumn.appendChild(listItemInitials);
    scoresColumn.appendChild(listItemScores);
  }
}

// listens for the submit button, triggers scoreSubmit function
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  scoreSubmit();
});

// listens for Reset Scores button, clears local storage and leaderboard
resestBtn.addEventListener("click", function (event) {
  localStorage.clear();
  scoresColumn.style.display = "none";
  initialsColumn.style.display = "none";
});
