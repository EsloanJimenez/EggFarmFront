import axios from "axios";
import { show_alert } from "../../utils/swal";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postInventory = async (productId, quantityAdded, quantityAvailable, notes, userId) => {
   if (productId === undefined || productId == '')
      show_alert('El producto es requerido', 'warning')
   else if (quantityAdded === undefined || quantityAdded == '')
      show_alert('La cantidad agregada es requerido', 'warning')
   else {
      Swal.fire({
         title: `Seguro de agregar el producto?`,
         text: 'No se podra dar marcha a tras',
         icon: 'question',
         showCancelButton: true,
         confirmButtonText: 'Si, agregar',
         cancelButtonText: 'cancelar'
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               const res = await axios.post(`${API_BASE_URL}Inventory`, {
                  ProductId: productId,
                  QuantityAdded: quantityAdded,
                  QuantityAvailable: quantityAvailable,
                  Notes: notes,
                  UserCreation: parseInt(userId)
               });

               if (res.status === 200)
                  show_alert('El inventario se registro con exito.', 'success');
            } catch (err) {
               if (err.response.data.errors.ProductId)
                  show_alert(err.response.data.errors.ProductId, 'warning')
               else if (err.response.data.errors.QuantityAdded)
                  show_alert(err.response.data.errors.QuantityAdded, 'warning')
            }
         } else
            show_alert("El Producto No fue agregado", "info");
      })
   }
}