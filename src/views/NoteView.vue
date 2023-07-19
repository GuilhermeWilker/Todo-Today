<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { supabase } from "../lib/supabaseClient";

const registros = ref([]);
const registroAtivo = ref({});
const visualizacaoRegistro = ref(false);

onMounted(() => {
  carregarRegistros();
});

const carregarRegistros = async () => {
  const { data, error } = await supabase.from("anotacoes").select("*");

  if (error) {
    console.error(error);
    return;
  }

  registros.value =
    data && data.length > 0
      ? data.sort((a, b) => new Date(b.updated) - new Date(a.updated))
      : [];

  registroAtivo.value =
    registros.value.length > 0
      ? registros.value[0]
      : { titulo: "", body: "", updated: "" };
};

const adicionarRegistro = async () => {
  const novaNota = {
    titulo: "",
    body: "",
    update: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("anotacoes").insert([novaNota]);

  carregarRegistros();
  registroAtivo.value = { ...novaNota };

  visualizacaoRegistro.value = true;
};

const selecionarRegistro = (id) => {
  registroAtivo.value = registros.value.find((registro) => registro.id === id);
  visualizacaoRegistro.value = true;
};

const deletarRegistro = async (id) => {
  const { error } = await supabase.from("anotacoes").delete().eq("id", id);
  if (error) {
    console.error(error);
    return;
  }

  carregarRegistros();
  registroAtivo.value = {};
  visualizacaoRegistro.value = false;
};

const salvarRegistro = async () => {
  const { error } = await supabase
    .from("anotacoes")
    .update(registroAtivo.value)
    .eq("id", registroAtivo.value.id);
  if (error) {
    console.error(error);
    return;
  }

  carregarRegistros();
};
</script>

<template>
  <div class="about">
    <div class="notes" id="notes">
      <!-- Sidebar -->
      <nav class="notes__sidebar">
        <!-- Botão adicionar nova anotação -->
        <button class="notes__add" type="button" @click="adicionarRegistro">
          Adicionar nota
        </button>

        <ul class="notes__list">
          <!-- Lista de anotações -->
          <li
            class="notes__list-item notes__list-item--selected"
            v-for="registro in registros"
            :key="registro.id"
            @click="selecionarRegistro(registro.id)"
            @dblclick="deletarRegistro(registro.id)"
          >
            <!-- Titulo do registro -->
            <h2 class="notes__small-title">{{ registro.titulo }}</h2>

            <!-- Pequeno resumod o registro -->
            <p class="notes__small-body">
              {{
                registro.body.substring(0, 30) + (registro.body.length > 30 ? "..." : "")
              }}
            </p>

            <!-- Data do regsitro -->
            <small class="notes__small-updated">
              {{
                new Date().toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              }}
            </small>
          </li>
        </ul>
      </nav>

      <!-- Preview das anotações -->
      <article
        class="notes__preview"
        :style="{ visibility: visualizacaoRegistro ? 'visible' : 'hidden' }"
      >
        <input
          class="notes__title"
          type="text"
          placeholder="Escreva seu título..."
          v-model="registroAtivo.titulo"
          @blur="salvarRegistro"
        />

        <!-- Campo de texto -->
        <textarea
          class="notes__body"
          placeholder="I am the notes body and i wanna be typed😏..."
          v-model="registroAtivo.body"
          @blur="salvarRegistro"
        ></textarea>
      </article>

      <div class="notes__home">
        <small>Clique 2x para excluir</small>

        <router-link to="/" class="btn-home"> Voltar ao inicio </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes {
  position: relative;
  margin-top: 50px;
  height: 80vh;
  display: flex;
  align-items: center;
}

.notes__home {
  position: absolute;
  margin-top: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;

  bottom: 20px;
  left: 50px;
}
.notes__home .btn-home {
  margin-top: 20px;
  background: #d9d9d9;
  border: none;
  border-radius: 20px;
  padding: 9px 18px;

  font-size: 16px;
  cursor: pointer;
}
.notes__home .btn-home:hover {
  background: #a0a0a0;
}

.notes__sidebar {
  height: 70vh;
  border: 2px solid #d9d9d9;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 1em;
  width: 270px;

  margin-top: -95px;
}

.notes__add {
  background: #262626;
  border: none;
  border-radius: 14px;
  color: #ffffff;
  cursor: pointer;

  font-size: 20px;
  font-family: "Staatliches";
  letter-spacing: 0.6px;

  margin-bottom: 1em;
  padding: 17px 50px;
  width: 100%;
}

.notes__add:hover {
  background: #3d3c3c;
}

.notes__list-item {
  cursor: pointer;
  list-style-type: none;
}

.notes__list-item--selected {
  margin-block: 12px;
  background: #242424;
  border-radius: 12px;
  /* font-weight: bold; */
}
.notes__list-item--selected:hover {
  background: #3d3d3d;
}

.notes__small-title,
.notes__small-updated {
  padding: 12px;
}

.notes__small-title {
  font-size: 16px;
}

.notes__small-body {
  font-size: 12px;
  padding: 0 10px;
  overflow: hidden;
  max-width: 90%;
}

.notes__small-updated {
  font-size: 12px;
  color: #aaaaaa;
  font-style: italic;
  text-align: right;
}

.notes__preview {
  height: 80vh;
  border: 2px solid #d9d9d9;
  border-radius: 0px 25px 25px 25px;

  display: flex;
  flex-direction: column;
  padding: 2em 3em;
  flex-grow: 1;
}

.notes__title,
.notes__body {
  border: none;
  outline: none;
  width: 100%;
}

.notes__title {
  font-size: 3em;
  font-weight: bold;
}

.notes__body {
  flex-grow: 1;
  font-size: 1.2em;
  line-height: 1.5;
  margin-top: 2em;
  resize: none;
}

.notes input,
.notes textarea {
  background-color: transparent;
  color: white;
}

@media (min-width: 1280px) {
  .notes__sidebar {
    height: 65vh;
  }

  .notes__preview {
    height: 80vh;
  }
}
</style>
