<template>
  <div class="containere">
    <div class="form">
      <h1>ARE</h1>

      <div class="form-container">
        <div class="input-container">
          <input
            type="text"
            v-model="userName"
            name="userName"
            id="userName"
            class="inputForm"
            placeholder=" "
          />
          <label for="userName">Nombre De Usuario</label>
        </div>

        <div class="input-container">
          <input
            type="password"
            v-model="password"
            name="password"
            id="password"
            class="inputForm"
            placeholder=" "
          />
          <label for="password">Contraseña</label>
        </div>

        <NewBotton title="Login" btnStyle="btn btn-primary" @click="onSubmit" />
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewBotton from "../components/NewBotton.vue";
import { useLoginStore } from "../store/registrarStore";
import { validateSetLogin } from "../js/validate";

const userName = ref("");
const password = ref("");
const error = ref(null);

const loginStore = useLoginStore();

const onSubmit = () => {
  loginStore.saveLogin(userName.value, password.value);

  validateSetLogin(userName.value, password.value);
};
</script>

<style scoped>
.containere {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: url(../assets/img/granja-4ompwdqywm6zht8d.jpg);
  background-size: cover;
  background-position: center;
}
.input-container {
  position: relative;
  margin-bottom: 20px;
}
.inputForm {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #5f5f5f;
  border-radius: 10px;
}
label {
  position: absolute;
  left: 10px;
  top: 40%;
  transform: translateY(-50%);
  color: #aaa;
  padding: 0 5px;
  transition: 0.3s ease;
  pointer-events: none;
}

.inputForm:focus + label,
.inputForm:not(:placeholder-shown) + label {
  top: 0px;
  left: 5px;
  color: #fff;
  font-size: 12px;
}
.form {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-container {
  width: 350px;
  padding: 15px 30px;
  background: rgba(62, 62, 62, 0.7);
  color: white;
  border-radius: 15px;
}
.form-container input {
  margin: 10px 0;
}
.btn-primary {
  width: 100%;
}
</style>
