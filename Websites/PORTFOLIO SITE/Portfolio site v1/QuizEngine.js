let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

function loadQuiz(quizName) {
    fetch(`${quizName}.json`)
        .then(res => res.json())
        .then(data => {
            quizData = data.questions;
            showQuestion();
            updateProgress();
        });
}

function showQuestion() {
    const container = document.getElementById("question-container");
    const q = quizData[currentQuestionIndex];

    container.innerHTML = `
        <div class="question-card">
            <h2>${q.question}</h2>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <label class="option">
                        <input type="radio" name="answer" value="${i}">
                        ${opt}
                    </label>
                `).join("")}
            </div>
        </div>
    `;
}

function updateProgress() {
    document.getElementById("progress").textContent =
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

document.getElementById("submit").addEventListener("click", () => {
    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Please select an answer");
        return;
    }

    const answer = parseInt(selected.value);

    if (answer === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("question-container").innerHTML = "";
    document.getElementById("submit").style.display = "none";

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("results").innerHTML = `
        <h2>Your Score</h2>
        <p>${score} / ${quizData.length}</p>
    `;

    handleQuizCompletion(score, quizData.length);
}