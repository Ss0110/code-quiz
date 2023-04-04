var quiz = [
    {
        title: "What tag is used to define the bottom section  of an HTML document?:",
        choices: ["<footer>", "<td>", "<h1> to <h6>", "<button>"],
        answer: "<footer>"
    },

    {
        title: "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
        choices: ["<code>", "<!DOCTYPE>", "<embed>", "<caption>"],
        answer: "<!DOCTYPE>"
    },

    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        title: "What tag can be used to insert a line break or blank line in an HTML document?",
        choices: ["<br>", "<tk>", "<head>", "<title>"],
        answer: "<br>"

    },

    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is ____:",
        choices: ["Javascript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },

];


//created var for Quiz Array for coding questions
var score = 0;
var quizIndex = 0;

var intervalSeconds = 80;
var intervalHold = 0;
var intervalPenalty = 10;

// var wrapper = document.querySelector("#wrapper");
var timeInterval = document.querySelector("#timeInterval");
var quizQuestions = document.querySelector("#quizQuestions");


var startInterval = document.querySelector(".start-btn");
//timer starts when button is clicked
startInterval.addEventListener("click", function () {
    if (intervalHold === 0) {
        intervalHold = setInterval(function () {
            intervalSeconds--;
            timeInterval.textContent = "Time: " + intervalSeconds;

            if (intervalSeconds <= 0) {
                clearInterval(intervalHold);
                quizOver();
                timeInterval.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(quizIndex);
});

function render(quizIndex) {

    var ulElement = document.createElement("ul");
    quizQuestions.innerHTML = "";
    ulElement.innerHTML = "";

    for (var i = 0; i < quiz.length; i++) {
        var questionPrompt = quiz[quizIndex].title;
        var choicesPrompt = quiz[quizIndex].choices;
        quizQuestions.textContent = questionPrompt;
    }

    choicesPrompt.forEach(function (newItem) {
        var listChoices = document.createElement("li");
        listChoices.textContent = newItem;
        quizQuestions.appendChild(ulElement);
        ulElement.appendChild(listChoices);
        listChoices.addEventListener("click", (compare));
    })
}

function compare(event) {
    var userChoice = event.target;

    if (userChoice.matches("li")) {

        var divElement = document.createElement("div");
        divElement.setAttribute("id", "divElement");

        if (userChoice.textContent == quiz[quizIndex].answer) {
            score++;
            divElement.textContent = "Correct! The answer is: " + quiz[quizIndex].answer;
        } else {
            intervalSeconds = intervalSeconds - intervalPenalty;
            divElement.textContent = "Wrong! The correct answer is: " + quiz[quizIndex].answer;
        }
    }
    quizIndex++;

    if (quizIndex >= quiz.length) {
        quizOver();
        divElement.innerHTML = "Awesome!" + " you got " + score + "/" + quiz.length + " Correct! " + "<br><br>" + "<ul>Quiz Answers: " + " alerts, parenthesis, all of the above, quotes, console log</ul>";
    } else {
        render(quizIndex);
    }
    quizQuestions.appendChild(divElement);
}

function quizOver() {
    quizQuestions.innerHTML = "";
    timeInterval.innerHTML = "";

    var h1Element = document.createElement("h1")
    h1Element.setAttribute("id", "h1Element");
    h1Element.textContent = "Quiz Over!";

    quizQuestions.appendChild(h1Element);

    var pElement = document.createElement("p")
    pElement.setAttribute("id", "pElement");

    quizQuestions.appendChild(pElement);

    if (intervalSeconds >= 0) {
        var timeLeft = intervalSeconds;
        var p2Element = document.createElement("p");
        clearInterval(intervalHold);
        pElement.textContent = "Final Score: " + timeLeft;

        quizQuestions.appendChild(p2Element);
    }

    //create label for user input
    var labelInput = document.createElement("label");
    labelInput.setAttribute("id", "labelInput");
    labelInput.textContent = "Enter initals: ";

    quizQuestions.appendChild(labelInput);


    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "userInput");
    inputEl.textContent = "";

    quizQuestions.appendChild(inputEl);

    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "submit");
    buttonEl.setAttribute("id", "submit");
    buttonEl.textContent = "Submit";

    quizQuestions.appendChild(buttonEl);

    buttonEl.addEventListener("click", function () {
        var userInput = inputEl.value;
        // console.log(inputEl.value)

        if (userInput === null) {
            // console.log ("no value entered")
        } else {
            var finalScore = {
                userInput: userInput,
                score: timeLeft
            }
            console.log(finalScore)
            var storedScores = localStorage.getItem("storedScores")
            if (storedScores === null) {
                storedScores = [];
            } else {
                storedScores = JSON.parse(storedScores);
            }
            storedScores.push(finalScore)
            var newScore = JSON.stringify(storedScores);
            localStorage.setItem("storedScores", newScore);

            window.location.replace("./index2.html");
        };
    });
}


