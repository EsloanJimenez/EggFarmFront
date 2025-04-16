import { defineStore } from "pinia";
import { ref } from "vue";

const userName = ref('');
const password = ref('');

export const useLoginStore = defineStore('login', () => {
   const saveLogin = (user, pass) => {
      userName.value = user;
      password.value = pass;
   }

   return { userName, password, saveLogin }
});