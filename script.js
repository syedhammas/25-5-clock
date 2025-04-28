
let breakLength = 5;
let sessionLength = 25;
let timerRunning = false;
let timerInterval = null;
let currentMode = "Session"; 
let timeLeft = sessionLength * 60;

const breakLengthElem = document.getElementById("break-length");
const sessionLengthElem = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeftElem = document.getElementById("time-left");
const startStopBtn = document.getElementById("start_stop");
const resetBtn = document.getElementById("reset");
const beep = document.getElementById("beep");

// Update time display
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeLeftElem.textContent = 
    `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Reset everything
function reset() {
  clearInterval(timerInterval);
  timerRunning = false;
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  currentMode = "Session";
  beep.pause();
  beep.currentTime = 0;
  updateLengths();
  timerLabel.textContent = "Session";
  updateDisplay();
}

// Start/Pause functionality
function startStop() {
  if (!timerRunning) {
    timerRunning = true;
    timerInterval = setInterval(countdown, 1000);
  } else {
    timerRunning = false;
    clearInterval(timerInterval);
  }
}

// Countdown timer
function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    beep.play();
    if (currentMode === "Session") {
      currentMode = "Break";
      timeLeft = breakLength * 60;
      timerLabel.textContent = "Break";
    } else {
      currentMode = "Session";
      timeLeft = sessionLength * 60;
      timerLabel.textContent = "Session";
    }
    updateDisplay();
  }
}

// Update break and session lengths
function updateLengths() {
  breakLengthElem.textContent = breakLength;
  sessionLengthElem.textContent = sessionLength;
}

// Event Listeners
document.getElementById("break-decrement").addEventListener("click", () => {
  if (breakLength > 1) {
    breakLength--;
    updateLengths();
    if (currentMode === "Break" && !timerRunning) {
      timeLeft = breakLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById("break-increment").addEventListener("click", () => {
  if (breakLength < 60) {
    breakLength++;
    updateLengths();
    if (currentMode === "Break" && !timerRunning) {
      timeLeft = breakLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById("session-decrement").addEventListener("click", () => {
  if (sessionLength > 1) {
    sessionLength--;
    updateLengths();
    if (currentMode === "Session" && !timerRunning) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById("session-increment").addEventListener("click", () => {
  if (sessionLength < 60) {
    sessionLength++;
    updateLengths();
    if (currentMode === "Session" && !timerRunning) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);

// Initialize
updateDisplay();
updateLengths();
