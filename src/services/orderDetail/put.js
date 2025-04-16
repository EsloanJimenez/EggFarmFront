import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const putOrderDetails = async (id, orderId, productId, quantity, unitPrice, subTotal, userId) => {
   try {
      const res = await axios.put(`${API_BASE_URL}OrderDetails/${id}`, {
         OrderDetailId: id,
         OrderId: orderId,
         ProductId: productId,
         Quantity: quantity,
         UnitPrice: unitPrice,
         SubTotal: subTotal,
         UserModify: parseInt(userId)
      })
   } catch (err) {
      show_alert(err, 'warning');
   }
} 