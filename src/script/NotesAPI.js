export default class NotesAPI {
  static obterRegistros() {
    const registro = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    return registro.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static salvarRegistro(registroParaSalvar) {
    const registros = NotesAPI.obterRegistros();
    const existing = registros.find(
      (registro) => registro.id == registroParaSalvar.id
    );

    // Editar / Update
    if (existing) {
      existing.titulo = registroParaSalvar.titulo;
      existing.body = registroParaSalvar.body;
      existing.updated = new Date().toISOString();
    } else {
      registroParaSalvar.id = Math.floor(Math.random() * 1000000);
      registroParaSalvar.updated = new Date().toISOString();
      registros.push(registroParaSalvar);
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(registros));
  }

  static deletarRegistro(id) {
    const registros = NotesAPI.obterRegistros();
    const novosRegistros = registros.filter((registro) => registro.id != id);

    localStorage.setItem("notesapp-notes", JSON.stringify(novosRegistros));
  }
}
