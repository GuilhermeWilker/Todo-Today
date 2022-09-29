import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
  constructor(raiz) {
    this.registros = [];
    this.registroAtivo = null;
    this.view = new NotesView(raiz, this._handlers());

    this._atualizarRegistros();
  }

  _atualizarRegistros() {
    const registros = NotesAPI.obterRegistros();

    this._definirRegistros(registros);

    if (registros.length > 0) {
      this._definirRegistroAtivo(registros[0]);
    }
  }

  _definirRegistros(registros) {
    this.registros = registros;
    this.view.updateListaRegistros(registros);
    this.view.updateVisualizacaoRegistro(registros.length > 0);
  }

  _definirRegistroAtivo(registro) {
    this.registroAtivo = registro;
    this.view.updateRegistroAtivo(registro);
  }

  _handlers() {
    return {
      selecionarRegistro: (registroId) => {
        const registroSelecionado = this.registros.find(
          (registro) => registro.id == registroId
        );
        this._definirRegistroAtivo(registroSelecionado);
      },
      adicionarRegistro: () => {
        const novoRegistro = {
          titulo: "Digite seu título",
          body: "Escreva seu registro",
        };

        NotesAPI.salvarRegistro(novoRegistro);
        this._atualizarRegistros();
      },
      editarRegistro: (titulo, body) => {
        NotesAPI.salvarRegistro({
          id: this.registroAtivo.id,
          titulo,
          body,
        });

        this._atualizarRegistros();
      },
      deletarRegistro: (registroId) => {
        NotesAPI.deletarRegistro(registroId);
        this._atualizarRegistros();
      },
    };
  }
}
