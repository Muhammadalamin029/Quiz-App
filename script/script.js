const questions = [
    {
        question: "What is the full meaning of HTML?",
        answers: [
            { text: "Hyper Terminal Markup Langauge", correct: "false"},
            { text: "Hyper Text Markup Langauge", correct: "true"},
            { text: "Hyper Termal Markup Langauge", correct: "false"},
            { text: "Hyper Term Markup Langauge", correct: "false"},
        ]
    },
    {
        question: "What is the use of CSS?",
        answers: [
            { text: "Cascading Style Sheet", correct: "true"},
            { text: "Cascading Score Sheet", correct: "false"},
            { text: "Cascading Set Sheet", correct: "false"},
            { text: "Cascading Scam Scene", correct: "false"},
        ]
    },
    {
        question: "What is the full meaning of JS?",
        answers: [
            { text: "Javascript", correct: "true"},
            { text: "Javasheet", correct: "false"},
            { text: "Javascheme", correct: "false"},
            { text: "Javascore", correct: "false"},
        ]
    },
    {
        question: "What is the use of PHP?",
        answers: [
            { text: "None", correct: "false"},
            { text: "Null", correct: "false"},
            { text: "All Of The Above", correct: "false"},
            { text: "None Of The Above", correct: "true"},
        ]
    },
    {
        question: "What is the use of CSS?",
        answers: [
            { text: "To Style Photos", correct: "false"},
            { text: "To Style Cloth", correct: "false"},
            { text: "To Style Website", correct: "true"},
            { text: "None Of The Above", correct: "false"},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");

let questionIndex = 0;
let score = 0;


function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();    
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    questionElement.innerText = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectedAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectedAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });

    
    nextButton.style.display = "block";
}

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if (questionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})




startQuiz()
