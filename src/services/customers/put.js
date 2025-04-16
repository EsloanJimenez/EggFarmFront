import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const putCustomers = async (id, firstName, lastName, email, phone, address, userId) => {
   if (firstName === undefined)
      show_alert('El campo nombre es obligatorio.', 'warning')
   else if (lastName === undefined)
      show_alert('El campo apellido es obligatorio.', 'warning')
   else if (email == undefined)
      show_alert('El campo correo es obligatorio.', 'warning')
   else if (phone === undefined)
      show_alert('El campo telefono es obligatorio.', 'warning')
   else if (phone.slice(0, 3) != 809 && phone.slice(0, 3) != 829 && phone.slice(0, 3) != 849)
      show_alert('El codigo de area es incorrecto.', 'warning')
   else if (address === undefined)
      show_alert('El campo dereccion es obligatorio.', 'warning')
   else {
      try {
         const res = await axios.put(`${API_BASE_URL}Customers/${id}`, {
            CustomerId: id,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Address: address,
            UserModify: parseInt(userId)
         });

         if (res.status === 200 || res.status === 204)
            show_alert('Cliente actualizado con exito.', 'success');

      } catch (err) {
         console.log(err.response.data.message);

         if (err.response.data.message)
            show_alert(err.response.data.message, 'warning')
         else if (err.response.data.errors.FirstName)
            show_alert(err.response.data.errors.FirstName, 'warning')
      }
   }
}

