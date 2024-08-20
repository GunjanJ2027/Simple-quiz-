const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
        correct: "Harper Lee"
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: ["Earth", "Mercury", "Mars", "Venus"],
        correct: "Mercury"
    },
    {
        question: "What is the speed of light?",
        answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
        correct: "300,000 km/s"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answer-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

document.addEventListener('DOMContentLoaded', loadQuestion);
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    answerListElement.innerHTML = '';

    currentQuizData.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.addEventListener('click', () => selectAnswer(li, currentQuizData.correct));
        answerListElement.appendChild(li);
    });

    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
}

function selectAnswer(selectedLi, correctAnswer) {
    const selectedAnswer = selectedLi.textContent;
    const allAnswers = answerListElement.querySelectorAll('li');
    allAnswers.forEach(li => li.classList.remove('selected'));
    selectedLi.classList.add('selected');

    if (selectedAnswer === correctAnswer) {
        score++;
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('quiz-controls').classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreElement.textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById('question-container').classList.remove('hide');
    document.getElementById('quiz-controls').classList.remove('hide');
    resultsContainer.classList.add('hide');
}
