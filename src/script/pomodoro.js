const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const stopBtn = document.querySelector(".stop");

const ringBell = document.querySelector("audio");

let wm = document.querySelector(".w-minutes");
let ws = document.querySelector(".w-seconds");

let bm = document.querySelector(".i-minutes");
let bs = document.querySelector(".i-seconds");

let startTimer;

startBtn.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    return;
  }
});

resetBtn.addEventListener("click", function () {
  wm.textContent = 25;
  ws.textContent = "00";

  bm.textContent = 5;
  bs.textContent = "00";

  document.querySelector(".turno").textContent = 0;
  stopInterval();
  startTimer = undefined;
});

stopBtn.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
});

function timer() {
  // Timer [trabalho]
  if (ws.textContent != 0) {
    ws.textContent--;
  } else if (wm.textContent != 0 && ws.textContent == 0) {
    ws.textContent = 59;
    wm.textContent--;
  }

  // Timer [intervalo]
  if (wm.textContent == 0 && ws.textContent == 0) {
    if (bs.textContent != 0) {
      bs.textContent--;
    } else if (bm.textContent != 0 && bs.textContent == 0) {
      bs.textContent = 59;
      bm.textContent--;
    }
  }

  // Aumento dos turnos
  if (
    wm.textContent == 0 &&
    ws.textContent == 0 &&
    bm.textContent == 0 &&
    bs.textContent == 0
  ) {
    wm.textContent = 25;
    ws.textContent = "00";

    bm.textContent = 5;
    bs.textContent = "00";

    document.querySelector(".turno").textContent++;
  }

  // Tocar audio de notificação pomodoro
  if (wm.textContent == 0 && ws.textContent == 0) {
    ringBell.play();
    if (bm.textContent == 4 && bs.textContent == 56) {
      ringBell.muted = true;
    } else if (bm.textContent == 0 && bs.textContent == 6) {
      ringBell.muted = false;
    }
  }
}

function stopInterval() {
  clearInterval(startTimer);
}
