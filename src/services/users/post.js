import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postUsers = async (userName, password, roleId, userId) => {
   if (userName == undefined || userName === '')
      show_alert("El campo nombre no puede estar basio.", "warning")
   else if (password == undefined || password === '')
      show_alert("El campo contraseña no puede estar basio.", "warning")
   else if (roleId == undefined || roleId === '')
      show_alert("El campo role no puede estar basio.", "warning")
   else {
      try {
         const res = await axios.post(`${API_BASE_URL}Users`, {
            UserName: userName.toLowerCase().trim(),
            PasswordHash: password,
            RoleId: roleId,
            UserCreation: userId
         });

         if (res.status === 200)
            show_alert('Usuario registrado con exito.', 'success');
      } catch (err) {
         if (err.response.data)
            show_alert(err.response.data, 'warning')
         else if (err.response.data.errors.UserName)
            show_alert(err.response.data.errors.UserName, 'warning')
         else if (err.response.data.errors.PasswordHash)
            show_alert(err.response.data.errors.PasswordHash, 'warning')
         else if (err.response.data.errors.RoleId)
            show_alert(err.response.data.errors.RoleId, 'warning')
      }
   }
}