import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const putOrder = async (id, customerId, totalAmount, statu, userId) => {
   if (customerId === undefined || customerId == '')
      show_alert('El campo cliente es requerido.', 'warning')
   else if (statu === undefined || statu == '')
      show_alert('El estado es requerido', 'warning')

   else {
      try {
         const res = await axios.put(`${API_BASE_URL}Orders/${id}`, {
            OrderId: id,
            CustomerId: customerId,
            TotalAmount: totalAmount,
            Status: statu,
            UserModify: parseInt(userId)
         })

         if (res.status === 200)
            show_alert('Orden actualizada con exito.', 'success')
      } catch (err) {
         show_alert(err, 'warning')
      }
   }
}
