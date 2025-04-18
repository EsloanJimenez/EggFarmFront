import axios from "axios";
import { show_alert } from "../../utils/swal";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const deleteUsers = async (id, userId, userName) => {
   Swal.fire({
      title: `Seguro de eliminar el Usuario: ${userName}?`,
      text: 'No se podra dar marcha a tras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'cancelar'
   }).then(async (result) => {
      if (result.isConfirmed) {
         const res = await axios.delete(`${API_BASE_URL}Users/${id}`, {
            data: {
               UserId: id,
               UserDelete: userId
            }
         });

         if (res.status === 200 || res.status === 204)
            show_alert('Usuario eliminado con exito.', 'success');
      } else
         show_alert("El Usuario No fue eliminado", "info");
   })
}