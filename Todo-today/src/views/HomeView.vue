<script setup>
import Navigation from '../components/Navigation/Navigation.vue'
import TodoList from '../components/todo-list/Todo-list.vue';
import Pomodoro from '../components/Pomodoro/Pomodoro.vue'
</script>

<template>
  <main>
    <main>
      <section>
        <Pomodoro />
        <Navigation />
      </section>

      <aside>
        <TodoList />
      </aside>
    </main>
  </main>
</template>
