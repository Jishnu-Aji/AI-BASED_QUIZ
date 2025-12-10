const questions = [
  {
    question: "What does AI stand for?",
    answers: [
      { text: "Artificial Intelligence", correct: true },
      { text: "Automatic Information", correct: false },
      { text: "Advanced Integration", correct: false },
      { text: "Auto Interpretation", correct: false }
    ]
  },
  {
    question: "Which company created ChatGPT?",
    answers: [
      { text: "Google", correct: false },
      { text: "Meta", correct: false },
      { text: "OpenAI", correct: true },
      { text: "IBM", correct: false }
    ]
  },
  {
    question: "Which of the following is an AI application?",
    answers: [
      { text: "Spotify Recommendations", correct: true },
      { text: "Analog Radio", correct: false },
      { text: "Mechanical Clock", correct: false },
      { text: "Paper Calendar", correct: false }
    ]
  },
  {
    question: "ML stands for?",
    answers: [
      { text: "Machine Learning", correct: true },
      { text: "Memory Logic", correct: false },
      { text: "Matrix Layer", correct: false },
      { text: "Micro Limit", correct: false }
    ]
  },
  {
    question: "What is the purpose of AI?",
    answers: [
      { text: "To mimic human intelligence", correct: true },
      { text: "To store data only", correct: false },
      { text: "To display websites", correct: false },
      { text: "To delete files", correct: false }
    ]
  },
  {
    question: "Which of the following is an AI language model?",
    answers: [
      { text: "ChatGPT", correct: true },
      { text: "Adobe Photoshop", correct: false },
      { text: "MS Word", correct: false },
      { text: "Paint", correct: false }
    ]
  },
  {
    question: "Neural networks are inspired by?",
    answers: [
      { text: "The human brain", correct: true },
      { text: "The solar system", correct: false },
      { text: "Cars", correct: false },
      { text: "Buildings", correct: false }
    ]
  },
  {
    question: "Which field is closely related to AI?",
    answers: [
      { text: "Machine Learning", correct: true },
      { text: "Carpentry", correct: false },
      { text: "Plumbing", correct: false },
      { text: "Dancing", correct: false }
    ]
  },
  {
    question: "Which AI tool converts speech to text?",
    answers: [
      { text: "Voice Recognition System", correct: true },
      { text: "Electric Fan", correct: false },
      { text: "Gas Stove", correct: false },
      { text: "Paint Brush", correct: false }
    ]
  },
  {
    question: "Which AI algorithm is used for learning from data?",
    answers: [
      { text: "Machine Learning", correct: true },
      { text: "Threading", correct: false },
      { text: "Bookmarking", correct: false },
      { text: "Windowing", correct: false }
    ]
  },
  {
    question: "Which of these is a chatbot?",
    answers: [
      { text: "Siri", correct: true },
      { text: "Microsoft Excel", correct: false },
      { text: "VLC Media Player", correct: false },
      { text: "Hard Disk", correct: false }
    ]
  },
  {
    question: "AI is used in?",
    answers: [
      { text: "Self-driving cars", correct: true },
      { text: "Typewriters", correct: false },
      { text: "Mechanical Watches", correct: false },
      { text: "Old Telephones", correct: false }
    ]
  },
  {
    question: "Computer vision helps AI to?",
    answers: [
      { text: "Understand images", correct: true },
      { text: "Play music", correct: false },
      { text: "Print pages", correct: false },
      { text: "Wash clothes", correct: false }
    ]
  },
  {
    question: "Natural Language Processing helps AI understand?",
    answers: [
      { text: "Human language", correct: true },
      { text: "Chemical reactions", correct: false },
      { text: "Weather cycles", correct: false },
      { text: "Road traffic", correct: false }
    ]
  },
  {
    question: "Deep learning uses?",
    answers: [
      { text: "Neural networks", correct: true },
      { text: "Mechanical gears", correct: false },
      { text: "Pipes", correct: false },
      { text: "Stones", correct: false }
    ]
  },
  {
    question: "Which of these is an AI image generator?",
    answers: [
      { text: "DALL·E", correct: true },
      { text: "Notepad", correct: false },
      { text: "Calculator", correct: false },
      { text: "PDF Reader", correct: false }
    ]
  },
  {
    question: "AI systems learn from?",
    answers: [
      { text: "Data", correct: true },
      { text: "Pure guessing", correct: false },
      { text: "Magic", correct: false },
      { text: "Random clicking", correct: false }
    ]
  },
  {
    question: "Which tech company uses AI for YouTube recommendations?",
    answers: [
      { text: "Google", correct: true },
      { text: "Honda", correct: false },
      { text: "Samsung", correct: false },
      { text: "Volvo", correct: false }
    ]
  },
  {
    question: "AI can be used in healthcare to?",
    answers: [
      { text: "Diagnose diseases", correct: true },
      { text: "Make pizza", correct: false },
      { text: "Drive boats", correct: false },
      { text: "Tie shoes", correct: false }
    ]
  },
  {
    question: "A benefit of AI is?",
    answers: [
      { text: "Automating repetitive tasks", correct: true },
      { text: "Making electricity", correct: false },
      { text: "Boiling water", correct: false },
      { text: "Cleaning rivers", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let summary = [];
let timePerQuestion = 15;
let timeLeft = timePerQuestion;
let timerInterval = null;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreDisplay = document.getElementById("score");
const summaryList = document.getElementById("summary-list");
const timerElement = document.getElementById("timer");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const restartBtn = document.getElementById("restart-btn");

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const soundClick = document.getElementById("sound-click");
const soundTimeup = document.getElementById("sound-timeup");

function playSound(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  summary = [];
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  nextButton.innerText = "Next";
  updateProgress();
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
  });
  startTimer();
}

function resetState() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = timePerQuestion;
  timerElement.textContent = timeLeft;
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function startTimer() {
  timerElement.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      handleTimeUp();
    }
  }, 1000);
}

function handleTimeUp() {
  playSound(soundTimeup);
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerText = currentQuestion.answers.find(a => a.correct).text;
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswerText) {
      btn.classList.add("correct");
    }
  });
  summary.push("⏰ Time up: " + currentQuestion.question);
  nextButton.style.display = "block";
}

function selectAnswer(button, correct) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
  });
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerText = currentQuestion.answers.find(a => a.correct).text;
  if (correct) {
    button.classList.add("correct");
    score++;
    summary.push("✔ Correct: " + currentQuestion.question);
    playSound(soundCorrect);
  } else {
    button.classList.add("incorrect");
    summary.push("❌ Wrong: " + currentQuestion.question);
    playSound(soundWrong);
  }
  Array.from(answerButtons.children).forEach(btn => {
    if (btn.innerText === correctAnswerText) {
      btn.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

function updateProgress() {
  const total = questions.length;
  const current = currentQuestionIndex + 1;
  if (current <= total) {
    progressText.textContent = "Question " + current + " / " + total;
    const percent = ((currentQuestionIndex) / total) * 100;
    progressBar.style.width = percent + "%";
  } else {
    progressText.textContent = "Quiz Completed";
    progressBar.style.width = "100%";
  }
}

nextButton.addEventListener("click", () => {
  playSound(soundClick);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateProgress();
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  playSound(soundClick);
  startQuiz();
});

function showResult() {
  clearInterval(timerInterval);
  timerInterval = null;
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  progressText.textContent = "Quiz Completed";
  progressBar.style.width = "100%";
  scoreDisplay.innerHTML = "Your Score: " + score + " / " + questions.length;
  summaryList.innerHTML = "";
  summary.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    summaryList.appendChild(li);
  });
}

startQuiz();
