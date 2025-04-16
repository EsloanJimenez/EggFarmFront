import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postOrderDetails = async (orderId, productId, quantity, unitPrice, subTotal, userId) => {
   try {
      const res = await axios.post(`${API_BASE_URL}OrderDetails`, {
         OrderId: orderId,
         ProductId: productId,
         Quantity: quantity,
         UnitPrice: unitPrice,
         SubTotal: subTotal,
         UserCreation: parseInt(userId)
      })
   } catch (err) {
      show_alert(err, 'warning');
   }
} 