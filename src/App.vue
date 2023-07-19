<script setup>
import { RouterView } from "vue-router";

import Clock from "./components/Clock/Clock.vue";
</script>

<template>
  <header>
    <h2>TO-DO</h2>
    <Clock />
    <h2>TODAY</h2>
  </header>
  <hr />

  <RouterView />
</template>

<style scoped></style>
