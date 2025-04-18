import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const putInventory = async (id, productId, quantityAdded, quantityAvailable, notes, userId) => {
   if (productId === undefined || productId == '')
      show_alert('El producto es requerido', 'warning')
   else {
      try {
         const res = await axios.put(`${API_BASE_URL}Inventory/${id}`, {
            InventoryId: id,
            ProductId: productId,
            QuantityAdded: quantityAdded,
            QuantityAvailable: quantityAvailable,
            Notes: notes,
            UserModify: userId
         });
      } catch (err) {
         show_alert(err)
      }
   }
}