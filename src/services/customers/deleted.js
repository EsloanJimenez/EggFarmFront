import axios from "axios";
import { show_alert } from "../../utils/swal";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const deleteCustomer = (id, userId, firstName, lastName) => {
   Swal.fire({
      title: `Seguro de eliminar el cliente: ${firstName} ${lastName}?`,
      text: 'No se podra dar marcha a tras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'cancelar'
   }).then(async (result) => {
      if (result.isConfirmed) {
         const res = await axios.delete(`${API_BASE_URL}Customers/${id}`, {
            data: {
               CustomerId: id,
               UserDelete: userId
            }
         });

         if (res.status === 200 || res.status === 204)
            show_alert('Cliente eliminado con exito.', 'success');
      } else
         show_alert("El cliente No fue eliminado", "info");
   })
}