import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from '../../utils/apiBaseURL.js'

export const putUsers = async (id, userName, password, role, userId) => {
   try {
      if (userName == undefined || userName === '')
         show_alert("El campo nombre no puede estar basio.", "warning")
      else if (password == undefined || password === '')
         show_alert("El campo contraseña no puede estar basio.", "warning")
      else if (role == undefined || role === '')
         show_alert("El campo role no puede estar basio.", "warning")
      else {
         try {
            const res = await axios.put(`${API_BASE_URL}${id}`, {
               UserId: id,
               UserName: userName.toLowerCase().trim(),
               PasswordHash: password,
               Role: role.toLowerCase().trim(),
               UserModify: parseInt(userId)
            });

            if (res.status === 200 || res.status === 204)
               show_alert('Usuario actualizado con exito.', 'success');

         } catch (err) {
            if (err.response.data.errors.UserName)
               show_alert(err.response.data.errors.UserName, 'warning')
            else if (err.response.data.errors.PasswordHash)
               show_alert(err.response.data.errors.PasswordHash, 'warning')
            else if (err.response.data.errors.Role)
               show_alert(err.response.data.errors.Role, 'warning')
         }
      }
   } catch (err) {

   }
}