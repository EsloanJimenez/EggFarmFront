import axios from "axios";
import { show_alert } from "../../utils/swal";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const deleteInventory = (id, userId, productName) => {
   Swal.fire({
      title: `Seguro de eliminar el producto: ${productName}?`,
      text: 'No se podra dar marcha a tras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'cancelar'
   }).then(async (result) => {
      if (result.isConfirmed) {
         const res = await axios.delete(`${API_BASE_URL}Inventory/${id}`, {
            data: {
               InventoryId: id,
               UserDelete: parseInt(userId)
            }
         });

         if (res.status === 200 || res.status === 204)
            show_alert('Producto eliminado con exito.', 'success');
      } else
         show_alert("El Producto No fue eliminado", "info");
   })
}