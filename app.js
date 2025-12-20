// =========================
// reveal
// =========================
const reveals = document.querySelectorAll(".reveal, .reveal-scale");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

reveals.forEach(el => observer.observe(el));



// =========================
// preloader
// =========================

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("fade-out");
        document.body.style.overflow = "auto";
    }, 800);
});


// =========================
// THEME HANDLING
// =========================
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

function toggleTheme() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

const themeSwitch = document.querySelector(".theme-switch");
if (themeSwitch) {
  themeSwitch.addEventListener("click", toggleTheme);
}

window.toggleTheme = toggleTheme;

// =========================
// MAIN PAGE: SHOW OPTIONS
// =========================
function showOptions() {
  const main = document.querySelector(".main");
  const container = document.querySelector(".centermain");
  const start = document.querySelector(".start-wrap");

  if (!main || !container || !start) return;

  const cards = container.querySelectorAll(".test-card");

  start.style.display = "none";
  container.classList.remove("hidden");
  main.classList.remove("start-only");
  main.classList.add("show-options");

  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add("show-card");
  });
}

const mainStartBtn = document.querySelector(".start-btn");
if (mainStartBtn) {
  mainStartBtn.addEventListener("click", showOptions);
}

// =========================
// BACKGROUND LIGHT ANIMATION
// =========================
const mainSection = document.querySelector(".main");
if (mainSection) {
  const canvas = document.createElement("canvas");
  canvas.className = "light-canvas";
  mainSection.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  function resizeCanvas() {
    canvas.width = mainSection.offsetWidth;
    canvas.height = mainSection.offsetHeight;
  }
  resizeCanvas();

  const lights = [];
  for (let i = 0; i < 5; i++) {
    lights.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 50 + Math.random() * 50,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(${100 + Math.random() * 155}, ${
        100 + Math.random() * 155
      }, 255, 0.4)`,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lights.forEach((light) => {
      light.x += light.dx;
      light.y += light.dy;
      if (light.x < 0 || light.x > canvas.width) light.dx *= -1;
      if (light.y < 0 || light.y > canvas.height) light.dy *= -1;

      const gradient = ctx.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        light.radius
      );
      gradient.addColorStop(0, light.color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", resizeCanvas);
}




// =========================
// 10 QUESTIONS QUIZ (index2.html)
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const quizStart = document.querySelector(".quiz-start");
    const quizContent = document.querySelector(".quiz-content");
    const timerDisplay = document.getElementById("timer-display");
    const questionsForm = document.getElementById("questionsForm");
    const questions = document.querySelectorAll(".question");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const popup = document.querySelector(".popup");
    const resultBox = document.querySelector(".result");
    const resultText = document.querySelector(".result-text");
    const restartBtn = document.getElementById("restart-btn");  

    if (
        !startBtn || !quizStart || !quizContent || !timerDisplay ||
        !questionsForm || !progressText || !progressFill ||
        !prevBtn || !nextBtn || !submitBtn || !popup || !resultBox || !resultText
    ) {
        return;
    }

    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let timeLeft = 10 * 60;
    let timerInterval = null;
    let nextClickedOnLast = false;

    quizContent.style.display = "none";
    resultBox.style.display = "none";
    popup.style.display = "none";

    // START QUIZ (start-btn)
    startBtn.addEventListener("click", () => {
        quizStart.style.display = "none";
        quizContent.style.display = "block";
        quizContent.classList.add("show");
        currentQuestionIndex = 0;
        nextClickedOnLast = false;
        showQuestion(0);
        updateProgress();
        startTimer();
    });

    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                autoSubmit();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
        const seconds = (timeLeft % 60).toString().padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function showQuestion(index) {
        questions.forEach(q => q.classList.remove("active"));
        questions[index].classList.add("active");
        currentQuestionIndex = index;
        progressText.textContent = `Question ${index + 1} of ${totalQuestions}`;

        if (index === 0) {
            prevBtn.style.display = "inline-block";
            prevBtn.disabled = true;
            nextBtn.style.display = "inline-block";
            submitBtn.style.display = "none";
            nextClickedOnLast = false;
        } else if (index > 0 && index < totalQuestions - 1) {
            prevBtn.style.display = "inline-block";
            prevBtn.disabled = false;
            nextBtn.style.display = "inline-block";
            submitBtn.style.display = "none";
            nextClickedOnLast = false;
        } else if (index === totalQuestions - 1) {
            if (!nextClickedOnLast) {
                prevBtn.style.display = "inline-block";
                prevBtn.disabled = false;
                nextBtn.style.display = "inline-block";
                submitBtn.style.display = "none";
            } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
                submitBtn.style.display = "inline-block";
            }
        }

        checkCurrentAnswered();
    }

    prevBtn.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            nextClickedOnLast = false;
            showQuestion(currentQuestionIndex);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else if (currentQuestionIndex === totalQuestions - 1) {
            nextClickedOnLast = true;
            showQuestion(currentQuestionIndex);
        }
    });

    function checkCurrentAnswered() {
        const qNumber = currentQuestionIndex + 1;
        const selected = questionsForm.querySelector(`input[name="q${qNumber}"]:checked`);
        if (currentQuestionIndex === totalQuestions - 1) {
            if (nextBtn.style.display !== "none") {
                nextBtn.disabled = !selected;
            }
        } else {
            nextBtn.disabled = !selected;
        }
    }

    questionsForm.addEventListener("change", (e) => {
        if (e.target.matches('input[type="radio"]')) {
            checkCurrentAnswered();
            updateProgress();
        }
    });

    function updateProgress() {
        let count = 0;
        for (let i = 1; i <= totalQuestions; i++) {
            const chosen = questionsForm.querySelector(`input[name="q${i}"]:checked`);
            if (chosen) count++;
        }
        const progressPercent = (count / totalQuestions) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    questionsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSubmit(false);
    });

    function autoSubmit() {
        handleSubmit(true);
    }

    function handleSubmit(fromTimer) {
        clearInterval(timerInterval);
        popup.style.display = "block";

        setTimeout(() => {
            popup.style.display = "none";
            calculatePersonality(fromTimer);

            resultBox.style.display = "block";
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            submitBtn.style.display = "none";
            if (restartBtn) restartBtn.style.display = "inline-block";
        }, 1200);
    }

    function calculatePersonality(fromTimer) {
        const answers = [];
        for (let i = 1; i <= totalQuestions; i++) {
            const ans = questionsForm.querySelector(`input[name="q${i}"]:checked`);
            answers.push(ans ? ans.value : "Not answered");
        }
        let score = 0;
        answers.forEach(v => {
            if (v === "Yes") score += 2;
            else if (v === "Not sure") score += 1;
        });

        let summary = "";
        if (score >= 16) {
            summary = "You show a strong balance of logical thinking, planning, and emotional stability. You likely handle challenges confidently and enjoy structured growth.";
        } else if (score >= 10) {
            summary = "You have many developing strengths in decision-making and self-reflection. With a bit more consistency, you can become even more clear and confident.";
        } else {
            summary = "You may still be exploring your style of thinking and reacting. Taking time to know your patterns can help you grow more intentional and calm.";
        }
        if (fromTimer) {
            summary += " The quiz was auto-submitted when the time ended.";
        }
        resultText.textContent = summary;
    }

    // ========== RESTART QUIZ ==========
    function restartQuiz() {
        questionsForm.reset();
        resultBox.style.display = "none";

        currentQuestionIndex = 0;
        timeLeft = 10 * 60;
        nextClickedOnLast = false;

        if (timerInterval) clearInterval(timerInterval);
        updateTimerDisplay();

        if (restartBtn) restartBtn.style.display = "none";
        prevBtn.style.display = "inline-block";
        prevBtn.disabled = true;
        nextBtn.style.display = "inline-block";
        nextBtn.disabled = true;
        submitBtn.style.display = "none";

        quizStart.style.display = "none";
        quizContent.style.display = "block";

        showQuestion(0);
        updateProgress();
        startTimer();
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", restartQuiz);
    }
});
