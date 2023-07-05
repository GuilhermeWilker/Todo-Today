<script setup>
import { ref, watchEffect } from 'vue';

const newTaskInput = ref('');
const tasks = ref([]);

const validateInput = () => newTaskInput.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    alert('Voce deve preencher a sua tarefa..');
    return;
  }

  tasks.value.push({
    description: newTaskInput.value,
    isCompleted: false,
  });

  newTaskInput.value = '';

  updateLocalStorage();
};

const handleClick = (task) => {
  task.isCompleted = !task.isCompleted;

  updateLocalStorage();
};

const handleDeleteClick = (task) => {
  const index = tasks.value.indexOf(task);

  if (index !== -1) {
    tasks.value.splice(index, 1);
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return;
  }
};

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

watchEffect(() => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if (tasksFromLocalStorage) {
    tasks.value = tasksFromLocalStorage;
  }
});
</script>

<template>
  <article class="container-todo-list">
    <header class="new-task-container">
      <input
        type="text"
        class="new-task-input"
        placeholder="Digite sua tarefa.."
        v-model="newTaskInput"
        @change="handleInputChange"
      />
      <button class="new-task-button" @click="handleAddTask">Adicionar</button>
    </header>

    <!-- To-do List -->
    <div class="tasks-container">
      <div v-for="task in tasks" :key="task.description" class="task-item">
        <p :class="{ completed: task.isCompleted }" @click="handleClick(task)">
          {{ task.description }}
        </p>
        <i class="fa-solid fa-trash-can" @click="handleDeleteClick(task)"></i>
      </div>
    </div>
  </article>
</template>

<style scoped>
.container-todo-list {
  color: black;

  border: 2px solid var(--dark-border-color);
  border-radius: 8px;
  min-width: 660px;
  width: 45%;

  padding: 30px 40px;
  height: 760px;

  overflow-y: scroll;
}

.container-todo-list::-webkit-scrollbar {
  width: 8px;
}

.container-todo-list::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 8px;
}

.new-task-container {
  padding: 30px 20px;
  border-top: 1px solid white;
  /* box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); */

  display: flex;
}

.new-task-container input {
  flex: 3;
  font-size: 1rem;
  font-weight: 500;

  border: 1px solid #feffff;
  border-radius: 5px;

  padding: 12px;
}

.new-task-container input:focus {
  outline: none;
}

.new-task-button {
  flex: 1;
  cursor: pointer;

  margin-left: 16px;
  padding: 12px;
  height: 100%;

  border: none;
  border-radius: 5px;

  font-weight: 600;
  font-size: 1rem;
  background: var(--dark-button-color);
  color: var(--dark-text-color);
}
.new-task-button:hover {
  background-color: #383535;
  transition: 1s;
}

.tasks-container {
  background-color: #e4e3e3;
  padding: 5px 20px;
  margin: 20px auto;

  box-shadow: 00 15px 30px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  width: 96%;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-block: 6px;
}

.task-item i {
  font-size: 1.2em;

  color: rgb(95, 86, 86);
  padding: 6px;
  cursor: pointer;
}
</style>
