import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postProducts = async (productName, description, price, userId) => {
   if (productName === undefined)
      show_alert('El campo nombre es obligatorio.', 'warning')
   else if (description === undefined)
      show_alert('El campo apellido es obligatorio.', 'warning')
   else if (price == undefined)
      show_alert('El campo correo es obligatorio.', 'warning')
   else {
      try {
         const res = await axios.post(`${API_BASE_URL}Products`, {
            ProductName: productName,
            Description: description,
            Price: price,
            UserCreation: userId
         });

         if (res.status === 200)
            show_alert('Producto registrado con exito.', 'success');

      } catch (err) {
         if (err.response.data.errors.ProductName)
            show_alert(err.response.data.errors.ProductName, 'warning')
         else if (err.response.data.errors.Description)
            show_alert(err.response.data.errors.Description, 'warning')
         else if (err.response.data.errors.Price)
            show_alert(err.response.data.errors.Price, 'warning')
      }
   }
}