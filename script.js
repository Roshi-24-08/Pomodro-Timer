let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let statusText = document.getElementById("statusText");

let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let timeLeft = workDuration;
let isWorkTime = true;
let isRunning = false;
let isPaused = false;
let timerInterval;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  isPaused = false;
  statusText.textContent = isWorkTime ? "Working..." : "Break Time!";

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      isWorkTime = !isWorkTime;
      timeLeft = isWorkTime ? workDuration : breakDuration;
      updateDisplay();
      alert(isWorkTime ? "Break's over! Time to work!" : "Good job! Take a 5-minute break.");
      statusText.textContent = isWorkTime ? "Ready to work!" : "Time to relax!";
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;

  if (!isPaused) {
    clearInterval(timerInterval);
    isPaused = true;
    pauseBtn.textContent = "Resume";
    statusText.textContent = "Paused";
  } else {
    isPaused = false;
    pauseBtn.textContent = "Pause";
    startTimer(); // resume
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = false;
  isWorkTime = true;
  timeLeft = workDuration;
  updateDisplay();
  statusText.textContent = "Ready to work!";
  pauseBtn.textContent = "Pause";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

