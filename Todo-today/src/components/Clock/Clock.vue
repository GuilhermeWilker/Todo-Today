<script setup>
import { onMounted, ref } from 'vue';

const horas = ref("");
const minutos = ref("");
const segundos = ref("");

  const updateClock = () => {
      const currentDate = new Date();
      horas.value = currentDate.getHours();
      minutos.value = currentDate.getMinutes();
      segundos.value = currentDate.getSeconds();

      horas.value = horas.value < 10
      ? '0' + horas.value
      : horas.value;

      minutos.value = minutos.value < 10
      ? '0' + minutos.value
      : minutos.value;

      segundos.value = segundos.value < 10
      ? '0' + segundos.value
      : segundos.value;

    };

  onMounted(() => {
    updateClock();
    setInterval(updateClock, 1000);
  });
</script>

<template>
  <!-- Relógio -->
  <div class="clock">
    <div>
      <span id="horas">{{horas}}</span>
      <span class="tempo">hrs</span>
    </div>

    <div>
      <span id="minutos">{{minutos}}</span>
      <span class="tempo">min</span>
    </div>

    <div>
      <span id="segundos">{{segundos}}</span>
      <span class="tempo" id="segundos-span">seg</span>
    </div>
  </div>
</template>

<style scoped>
.clock {
  font-family: "Staatliches", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  margin-bottom: 10px;
  height: 50px;
  width: 18rem;

  font-size: 3.5rem;
}

.clock div {
  text-align: center;
  width: 90px;
  height: 40px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--dark-title-color);

  letter-spacing: 1.3px;
}

.clock span.tempo {
  font-weight: 450;
  font-size: 13px;
}
</style>
