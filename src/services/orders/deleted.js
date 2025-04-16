import axios from "axios";
import { show_alert } from "../../utils/swal";
import Swal from "sweetalert2";
import { deleteOrderDetails } from "../orderDetail/deleted";
import { getOrderDetailId } from "../orderDetail/get";
import { getInventoryId } from "../inventory/get";
import { putInventory } from "../inventory/put";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const deleteOrder = (id, userId, firstName) => {
   Swal.fire({
      title: `Seguro de eliminar la orden: ${firstName}?`,
      text: 'No se podra dar marcha a tras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'cancelar'
   }).then(async (result) => {
      if (result.isConfirmed) {
         const orderDetail = await getOrderDetailId(id);

         for (const detail of orderDetail) {
            const inventory = await getInventoryId(detail.productId);
            const newQuantityAvailable = inventory.quantityAvailable + detail.quantity;

            await putInventory(
               inventory.inventoryId,
               detail.productId,
               inventory.quantityAdded,
               newQuantityAvailable,
               inventory.notes,
               userId
            );
         }

         await deleteOrderDetails(id, userId);

         const res = await axios.delete(`${API_BASE_URL}Orders/${id}`, {
            data: {
               OrderId: id,
               UserDelete: parseInt(userId)
            }
         });

         if (res.status === 200 || res.status === 204)
            show_alert('Orden eliminada con exito.', 'success');
         else
            show_alert('Error al eliminar la orden', 'error')
      } else
         show_alert("La orden No fue eliminado", "info");
   })
}