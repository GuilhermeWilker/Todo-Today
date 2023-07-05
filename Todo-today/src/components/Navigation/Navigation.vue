<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header id="artigo-01">
    <RouterLink to="/notes" class="note-btn">Criar anotações</RouterLink>

    <RouterLink to="/" class="note-btn">Criar Mapas mentais</RouterLink>
  </header>

  <section>
    <img class="img" src="/imgs/pablita-911.png" alt="" />
    <p>
      Obtenha melhor desempenho mesclando suas tarefas com o uso do
      <strong>Pomodoro</strong>, te auxiliando a gerenciar melhor seu tempo em
      cada uma delas.
    </p>
  </section>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
}

.note-btn {
    background-color: #d9d9d9;
    font-weight: 500;
    font-size: 14px;

    border-radius: 20px;
    padding: 12px 18px;
    cursor: pointer;

    color: black;
    border: none;

    transition: 0.3s;
  }
 .note-btn:hover {
    background-color: #b4b2b2;
  }

  section {
    margin-top: 20px;
  }

  .img {
    width: 90%;
  }
</style>
