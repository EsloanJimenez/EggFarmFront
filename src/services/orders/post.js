import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postOrder = async (customerId, totalAmount, statu, userId) => {
   if (customerId === undefined || customerId == '')
      show_alert('El campo cliente es requerido.', 'warning')
   else if (totalAmount === undefined || totalAmount == '')
      show_alert('La cantidad es requerido', 'warning')
   else if (statu === undefined || statu == '')
      show_alert('El estado es requerido', 'warning')

   else {
      try {
         const res = await axios.post(`${API_BASE_URL}Orders`, {
            CustomerId: customerId,
            TotalAmount: totalAmount,
            Status: statu,
            UserCreation: userId
         })

         if (res.status === 200)
            show_alert('Orden registrada con exito.', 'success')
      } catch (err) {
         if (err.response.data.errors.CustomerId)
            show_alert(err.response.data.errors.CustomerId, 'warning')
         else if (err.response.data.errors.TotalAmount)
            show_alert(err.response.data.errors.TotalAmount, 'warning')
      }
   }
}