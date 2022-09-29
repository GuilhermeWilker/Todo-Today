export default class NotesView {
  constructor(
    raiz,
    {
      selecionarRegistro,
      adicionarRegistro,
      editarRegistro,
      deletarRegistro,
    } = {}
  ) {
    this.raiz = raiz;
    this.selecionarRegistro = selecionarRegistro;
    this.adicionarRegistro = adicionarRegistro;
    this.editarRegistro = editarRegistro;
    this.deletarRegistro = deletarRegistro;

    this.raiz.innerHTML = `
    <div class="notes__sidebar">
        <button class="notes__add" type="button">Novo registro</button>
        <div class="notes__list">
          <div class="notes__list-item notes__list-item--selected"></div>
        </div>
      </div>
      <div class="notes__preview">
        <input
          class="notes__title"
          type="text"
          placeholder="Escreva seu título..."
        />
        <textarea 
        placeholder="Escreva seu registro..."
        class="notes__body"></textarea>
      </div>

      <div class="notes__home">
        <button class="btn-home" onclick="window.location.href= 'index.html'">
          Voltar ao inicio
        </button>
      </div>
    `;

    const btnAdicionarRegistro = this.raiz.querySelector(".notes__add");
    const inpTitulo = this.raiz.querySelector(".notes__title");
    const inpBody = this.raiz.querySelector(".notes__body");

    btnAdicionarRegistro.addEventListener("click", () => {
      this.adicionarRegistro();
    });

    [inpTitulo, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitulo = inpTitulo.value.trim();
        const updatedBody = inpBody.value.trim();

        this.editarRegistro(updatedTitulo, updatedBody);
      });
    });

    // CRIAR: Esconder o preview dos registros por padrão.

    this.updateVisualizacaoRegistro(false);
  }

  _criarListaItensHTML(id, titulo, conteudo, updated) {
    const MAX_CONTEUDO_LENGTH = 30;

    return `
        <div class="notes__list-item" data-note-id="${id}">
            <div class="notes__small-title"> ${titulo}</div>
            <div class="notes__small-title"> 
                ${conteudo.substring(0, MAX_CONTEUDO_LENGTH)}
                ${conteudo.length > MAX_CONTEUDO_LENGTH ? "..." : ""}
            </div>
            <div class="notes__small-updated"> 
                ${updated.toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
            </div>
        </div>
    `;
  }

  updateListaRegistros(registros) {
    const listaRegistrosContainer = this.raiz.querySelector(".notes__list");

    // lista vazia
    listaRegistrosContainer.innerHTML = "";

    for (const registro of registros) {
      const html = this._criarListaItensHTML(
        registro.id,
        registro.titulo,
        registro.body,
        new Date(registro.updated)
      );

      listaRegistrosContainer.insertAdjacentHTML("beforeend", html);
    }

    // Adicionar eveneto de selecionar/deletar para cada item da lista
    listaRegistrosContainer
      .querySelectorAll(".notes__list-item")
      .forEach((listaRegistroItem) => {
        listaRegistroItem.addEventListener("click", () => {
          this.selecionarRegistro(listaRegistroItem.dataset.noteId);
        });

        listaRegistroItem.addEventListener("dblclick", () => {
          const deletar = confirm(
            "Você esta excluindo uma de suas anotações... Deseja continuar?"
          );

          if (deletar) {
            this.deletarRegistro(listaRegistroItem.dataset.noteId);
          }
        });
      });
  }

  updateRegistroAtivo(registro) {
    this.raiz.querySelector(".notes__title").value = registro.titulo;
    this.raiz.querySelector(".notes__body").value = registro.body;

    this.raiz
      .querySelectorAll(".notes__list-item")
      .forEach((listaRegistroItem) => {
        listaRegistroItem.classList.remove("notes__list-item--selected");
      });

    this.raiz
      .querySelector(`.notes__list-item[data-note-id="${registro.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateVisualizacaoRegistro(visivel) {
    this.raiz.querySelector(".notes__preview").style.visibility = visivel
      ? "visible"
      : "hidden";
  }
}
