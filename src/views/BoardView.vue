<script>
import { mapActions } from "pinia";
import useMindMapStore from "../stores/mindMap";

export default {
  data() {
    return {
      backgroundImageUrl: 'url("/imgs/grid.png")',
    };
  },

  methods: {
    ...mapActions(useMindMapStore, ["createMindMap"]),
    addMindMap(e) {
      this.createMindMap(e);
    },
  },
};
</script>

<template>
  <div class="header">
    <router-link to="/" class="btn-home">Voltar ao inicio</router-link>
    <small>
      Utilize o atalho <span>Ctrl + clique</span> para deletar bloco de texto
    </small>
  </div>

  <div
    @click="addMindMap"
    class="board"
    :style="{ backgroundImage: backgroundImageUrl }"
  ></div>
</template>

<style scoped>
.board {
  width: 100%;
  height: 84vh;
  overflow: hidden;
}

small span {
  background-color: #3d3d3d;
  margin-inline: 5px;
  border-radius: 4px;

  padding: 6px;
}

.header {
  margin-block: 20px;

  display: flex;
  align-items: center;

  justify-content: space-between;
}

.btn-home {
  background: #d9d9d9;
  border: none;
  border-radius: 20px;
  padding: 9px 18px;

  font-size: 16px;
  cursor: pointer;
}
</style>
