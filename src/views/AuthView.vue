<script setup>
//..
</script>

<template>
  <main class="auth">
    <section class="auth__hero">
      <h3>Bem vindo ao To-do Today!</h3>
      <p>Se é sua primeira vez aqui, faça seu cadastro ao lado..</p>

      <div class="auth__hero-img-container">
        <a href="/login" class="anchor">Se já nos conhece, clique aqui</a>

        <img src="/imgs/pablita-911.png" alt="" />
      </div>
    </section>

    <section class="form__area">
      <form action="">
        <h2 class="my-4 txt-center">Criar uma nova conta</h2>

        <button class="form-btn-social my-1">
          <img src="../../public/imgs/github.png" alt="icone do github" />
          Sing in with Github
        </button>

        <button class="form-btn-social">
          <img src="../../public/imgs/google.png" alt="icone do google" />
          Sing in with Google
        </button>

        <div class="line"></div>

        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" name="name" placeholder="Jhon doe" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" placeholder="jhondoe@todo.com" />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" name="password" placeholder="***********" />
        </div>

        <button class="form-btn" type="submit">Sign up</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.auth {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
}

.auth__hero {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
}

.auth__hero h3 {
  margin-block: 12px;

  font-size: 30px;
  font-weight: 700;
}

.auth__hero p {
  text-align: center;
  font-size: 19px;
  font-weight: 500;

  width: 347px;
}

.auth__hero-img-container {
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 65px;
}

.auth__hero-img-container img {
  width: 130%;
}

.form__area {
  width: 60%;
  height: 100%;
  padding: 30px;

  background-color: white;
  color: black;
}

.form__area form {
  margin: 150px auto;
  width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group input {
  width: 409px;
  height: 49px;

  padding: 3px 25px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background: #fff;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
}

.form-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 409px;
  height: 49px;
  border-radius: 5px;
  border: none;
  background: #519bf1;

  color: white;
  font-weight: bold;
  cursor: pointer;
}

.form-btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  width: 409px;
  height: 49px;
  border-radius: 5px;
  border: none;
  background: #f1f1f1;


  font-weight: bold;
  cursor: pointer;
}

.form-btn-social:hover {
  background: #e7e7e7;
}


.line {
  margin: 30px auto;
  width: 100%;
  height: 1px;

  background-color: #717171;
  border-radius: 5px;
}
</style>
