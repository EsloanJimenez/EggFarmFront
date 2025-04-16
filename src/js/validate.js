import axios from "axios";
import { show_alert } from "../utils/swal"

export const validateSetLogin = async (userName, password) => {
   if (userName === '')
      show_alert("El campo nombre de usuario es obligatorio", "warning");
   else if (password === '')
      show_alert("El campo contraseña es obligatorio", "warning");
   else {
      try {
         const res = await axios.post(`https://localhost:44335/api/Users/Login`, {
            UserName: userName.toLowerCase().trim(),
            Password: password
         })

         if (res.status === 200 || res.status === 204) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('userRole', res.data.userRole);

            window.setTimeout(() => {
               window.location.href = '/Orders';
            }, 500);
         }
      } catch (err) {
         if (err.response.status === 401)
            show_alert(err.response.data, 'error');
      }
   }
}