<script setup>
import { ref } from 'vue';

const startBtn = ref(null);
const resetBtn = ref(null);
const stopBtn = ref(null);

const ringBell = ref(null);

const wm = ref(25);
const ws = ref('00');

const bm = ref(5);
const bs = ref('00');

let startTimer;

const startTimerHandler = () => {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    return;
  }
};

const resetTimerHandler = () => {
  wm.value = 25;
  ws.value = '00';

  bm.value = 5;
  bs.value = '00';

  stopInterval();
  startTimer = undefined;
};

const stopTimerHandler = () => {
  stopInterval();
  startTimer = undefined;
};

const timer = () => {
  // Timer [trabalho]
  if (ws.value !== '00') {
    ws.value--;
  } else if (wm.value !== 0 && ws.value === '00') {
    ws.value = 59;
    wm.value--;
  }

  // Timer [intervalo]
  if (wm.value === 0 && ws.value === '00') {
    if (bs.value !== '00') {
      bs.value--;
    } else if (bm.value !== 0 && bs.value === '00') {
      bs.value = 59;
      bm.value--;
    }
  }

  // Aumento dos turnos
  if (wm.value === 0 && ws.value === '00' && bm.value === 0 && bs.value === '00') {
    wm.value = 25;
    ws.value = '00';

    bm.value = 5;
    bs.value = '00';

    document.querySelector('.turno').textContent++;
  }

  // Tocar audio de notificação pomodoro
  if (wm.value === 0 && ws.value === '00') {
    ringBell.value.play();
    if (bm.value === 4 && bs.value === '56') {
      ringBell.value.muted = true;
    } else if (bm.value === 0 && bs.value === '06') {
      ringBell.value.muted = false;
    }
  }
};

const stopInterval = () => {
  clearInterval(startTimer);
};
</script>

<template>
  <article class="pomodoro-container">
    <h3>Pomodoro</h3>
    <div class="timer-pomodoro">
      <!-- Timer Work -->
      <div class="w-container">
        <label id="work-timer" for="">Trabalho:</label><br />
        <span class="w-minutes">{{ wm }}</span>
        <span>:</span>
        <span class="w-seconds">{{ ws }}</span
        ><br />
        <button class="start" ref="startBtn" @click="startTimerHandler">
          Iniciar
        </button>
      </div>

      <!-- Timer Turno -->
      <div class="t-container">
        <label for="">Turno:</label><br />
        <span class="turno">0</span><br />
        <button class="reset" ref="resetBtn" @click="resetTimerHandler">
          Reset
        </button>
      </div>

      <!-- Timer intervalo -->
      <div class="i-container">
        <label for="">Intervalo:</label><br />
        <span class="i-minutes">{{ bm }}</span>
        <span>:</span>
        <span class="i-seconds">{{ bs }}</span
        ><br />
        <button class="stop" ref="stopBtn" @click="stopTimerHandler">
          Pausar
        </button>
      </div>

      <audio src="src/audio/Ram Bell Sound.mp3" ref="ringBell"></audio>
    </div>
  </article>
</template>

<style scoped>
.pomodoro-container {
  text-align: center;
  width: 660px;
  border: 2px solid var(--dark-border-color);
  border-radius: 0px 17px 17px;
}

.pomodoro-container h3 {
  margin-top: 12px;
  font-family: "Staatliches", sans-serif;
  letter-spacing: 5px;
  font-size: 2.5rem;
  font-weight: 300;

  display: inline-block;
}

.timer-pomodoro {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 25px;
}

.timer-pomodoro label {
  display: inline-block;
}

.w-container {
  width: 200px;

  text-align: center;
}

.t-container {
  width: 200px;

  text-align: center;
}
.i-container {
  width: 200px;

  text-align: center;
}

.pomodoro-container button {
  margin-top: 15px;
  width: 60%;
  padding: 12px;

  border: none;
  border-radius: 5px;

  color: white;
  background-color: var(--dark-button-color);
  cursor: pointer;
}

.pomodoro-container button:hover {
  background-color: #383535;
  transition: 1s;
}
</style>
