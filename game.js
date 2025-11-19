// Game State
let gameData = {
    questions: []
};
let currentQuestionIndex = 0;
let team1Score = 0;
let team2Score = 0;
let roundScore = 0;
let strikes = 0;

// DOM Elements
const questionElement = document.getElementById('question');
const team1ScoreElement = document.getElementById('team1-score');
const team2ScoreElement = document.getElementById('team2-score');
const roundScoreElement = document.getElementById('round-score');
const jsonUpload = document.getElementById('json-upload');
const fileNameElement = document.getElementById('file-name');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // File upload
    jsonUpload.addEventListener('change', handleFileUpload);

    // Question navigation
    document.getElementById('prev-question').addEventListener('click', previousQuestion);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('reset-question').addEventListener('click', resetCurrentQuestion);

    // Team controls
    document.getElementById('award-team1').addEventListener('click', () => awardTeam(1));
    document.getElementById('award-team2').addEventListener('click', () => awardTeam(2));
    document.getElementById('add-strike').addEventListener('click', addStrike);
    document.getElementById('clear-strikes').addEventListener('click', clearStrikes);

    // Score controls
    document.getElementById('reset-scores').addEventListener('click', resetAllScores);

    // Answer row clicks
    document.querySelectorAll('.answer-row').forEach((row, index) => {
        row.addEventListener('click', () => revealAnswer(index));
    });
});

// File Upload Handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            gameData = JSON.parse(e.target.result);
            if (!gameData.questions || !Array.isArray(gameData.questions)) {
                throw new Error('Invalid JSON format. Expected "questions" array.');
            }
            currentQuestionIndex = 0;
            fileNameElement.textContent = `Loaded: ${file.name}`;
            loadQuestion(currentQuestionIndex);
            alert(`Successfully loaded ${gameData.questions.length} questions!`);
        } catch (error) {
            alert(`Error loading file: ${error.message}`);
            console.error(error);
        }
    };
    reader.readAsText(file);
}

// Load Question
function loadQuestion(index) {
    if (!gameData.questions || gameData.questions.length === 0) {
        questionElement.textContent = 'No questions loaded!';
        return;
    }

    if (index < 0 || index >= gameData.questions.length) {
        return;
    }

    const question = gameData.questions[index];
    questionElement.textContent = question.question;

    // Reset all answers
    for (let i = 0; i < 8; i++) {
        const answerRow = document.querySelector(`.answer-row[data-index="${i}"]`);
        const answerText = document.getElementById(`answer-${i}`);
        const answerPoints = document.getElementById(`points-${i}`);

        if (i < question.answers.length) {
            answerRow.style.display = 'flex';
            answerRow.classList.remove('revealed');
            answerText.querySelector('.hidden-answer').textContent = question.answers[i].text;
            answerPoints.textContent = String(question.answers[i].points).padStart(2, '0');
        } else {
            answerRow.style.display = 'none';
        }
    }

    roundScore = 0;
    updateScoreDisplay();
}

// Reveal Answer
function revealAnswer(index) {
    if (!gameData.questions || gameData.questions.length === 0) {
        return;
    }

    const question = gameData.questions[currentQuestionIndex];
    if (index >= question.answers.length) {
        return;
    }

    const answerRow = document.querySelector(`.answer-row[data-index="${index}"]`);
    if (answerRow.classList.contains('revealed')) {
        return; // Already revealed
    }

    answerRow.classList.add('revealed');
    const points = question.answers[index].points;
    roundScore += points;
    updateScoreDisplay();
}

// Navigation
function nextQuestion() {
    if (!gameData.questions || gameData.questions.length === 0) {
        alert('Please load a questions file first!');
        return;
    }

    if (currentQuestionIndex < gameData.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        clearStrikes();
    } else {
        alert('This is the last question!');
    }
}

function previousQuestion() {
    if (!gameData.questions || gameData.questions.length === 0) {
        alert('Please load a questions file first!');
        return;
    }

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        clearStrikes();
    } else {
        alert('This is the first question!');
    }
}

function resetCurrentQuestion() {
    loadQuestion(currentQuestionIndex);
    clearStrikes();
}

// Team Scoring
function awardTeam(teamNumber) {
    if (roundScore === 0) {
        alert('No points to award! Reveal some answers first.');
        return;
    }

    if (teamNumber === 1) {
        team1Score += roundScore;
    } else {
        team2Score += roundScore;
    }

    alert(`Team ${teamNumber} awarded ${roundScore} points!`);
    roundScore = 0;
    updateScoreDisplay();
}

// Strikes
function addStrike() {
    if (strikes < 3) {
        strikes++;
        updateStrikesDisplay();
        
        if (strikes === 3) {
            setTimeout(() => {
                alert('3 Strikes! The other team can steal!');
            }, 500);
        }
    }
}

function clearStrikes() {
    strikes = 0;
    updateStrikesDisplay();
}

function updateStrikesDisplay() {
    for (let i = 1; i <= 3; i++) {
        const strikeElement = document.getElementById(`strike${i}`);
        if (i <= strikes) {
            strikeElement.classList.add('active');
        } else {
            strikeElement.classList.remove('active');
        }
    }
}

// Score Display
function updateScoreDisplay() {
    team1ScoreElement.textContent = team1Score;
    team2ScoreElement.textContent = team2Score;
    roundScoreElement.textContent = roundScore;
}

function resetAllScores() {
    if (confirm('Are you sure you want to reset all scores?')) {
        team1Score = 0;
        team2Score = 0;
        roundScore = 0;
        updateScoreDisplay();
        clearStrikes();
    }
}
