// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");

const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "HyperText Marketing Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "Hyper Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to insert a line break?",
    answers: [
      { text: "<line>", correct: false },
      { text: "<lb>", correct: false },
      { text: "<br>", correct: true },
      { text: "<break>", correct: false },
    ],
  },
  {
    question: "Which is the correct HTML element for the largest heading?",
    answers: [
      { text: "<h6>", correct: false },
      { text: "<heading>", correct: false },
      { text: "<head>", correct: false },
      { text: "<h1>", correct: true },
    ],
  },
  {
    question: "Which tag is used to display an image in HTML?",
    answers: [
      { text: "<pic>", correct: false },
      { text: "<image>", correct: false },
      { text: "<img>", correct: true },
      { text: "<src>", correct: false },
    ],
  },
  {
    question: "What is the correct syntax to create a hyperlink in HTML?",
    answers: [
      { text: "<a link='url'>Link</a>", correct: false },
      { text: "<a href='url'>Link</a>", correct: true },
      { text: "<link url='url'>Link</link>", correct: false },
      { text: "<a>url</a>", correct: false },
    ],
  },
  {
    question: "Which tag is used to create a numbered list in HTML?",
    answers: [
      { text: "<ul>", correct: false },
      { text: "<ol>", correct: true },
      { text: "<li>", correct: false },
      { text: "<list>", correct: false },
    ],
  },
  {
    question: "What is the correct HTML element for inserting a line?",
    answers: [
      { text: "<line>", correct: false },
      { text: "<breakline>", correct: false },
      { text: "<hr>", correct: true },
      { text: "<brline>", correct: false },
    ],
  },
  {
    question: "Which attribute specifies the URL of an image in HTML?",
    answers: [
      { text: "src", correct: true },
      { text: "href", correct: false },
      { text: "alt", correct: false },
      { text: "title", correct: false },
    ],
  },
  {
    question: "What is the correct HTML for adding a background color?",
    answers: [
      { text: "<body bg='yellow'>", correct: false },
      { text: "<body style='background-color: yellow;'>", correct: true },
      { text: "<background>yellow</background>", correct: false },
      { text: "<body color='yellow'>", correct: false },
    ],
  },
  {
    question: "Which tag is used to define a paragraph in HTML?",
    answers: [
      { text: "<para>", correct: false },
      { text: "<p>", correct: true },
      { text: "<pg>", correct: false },
      { text: "<paragraph>", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

// Initial setup
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  finalScoreSpan.textContent = 0;
  resultMessage.textContent = "";

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = ((currentQuestionIndex) / quizQuestions.length) * 100 + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Excellent! You got all correct!";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Great Job!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Good effort! Try again to improve.";
  } else {
    resultMessage.textContent = "Keep practicing!";
  }
}

function restartQuiz() {
  startScreen.classList.add("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");
}
