import axios from "axios"
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const postCustomers = async (firstName, lastName, email, phone, address, userId) => {
   if (firstName === undefined || firstName.trim() === "")
      show_alert('El campo nombre es obligatorio.', 'warning')
   else if (lastName === undefined || lastName.trim() === "")
      show_alert('El campo apellido es obligatorio.', 'warning')
   else if (email == undefined || email.trim() === "")
      show_alert('El campo correo es obligatorio.', 'warning')
   else if (phone === undefined || phone.trim() === "")
      show_alert('El campo telefono es obligatorio.', 'warning')
   else if (phone.slice(0, 3) != 809 && phone.slice(0, 3) != 829 && phone.slice(0, 3) != 849)
      show_alert('El codigo de area es incorrecto.', 'warning')
   else if (address === undefined)
      show_alert('El campo dereccion es obligatorio.', 'warning')
   else {
      try {
         const res = await axios.post(`${API_BASE_URL}Customers`, {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Address: address,
            UserCreation: userId
         });

         if (res.status === 200)
            show_alert('Cliente registrado con exito.', 'success');

      } catch (err) {
         if (err.response.data)
            show_alert(err.response.data, 'warning')
         else if (err.response.data.errors.FirstName)
            show_alert(err.response.data.errors.FirstName, 'warning')
         else if (err.response.data.errors.LastName)
            show_alert(err.response.data.errors.LastName, 'warning')
         else if (err.response.data.errors.Email)
            show_alert(err.response.data.errors.Email, 'warning')
         else if (err.response.data.errors.Phone)
            show_alert(err.response.data.errors.Phone, 'warning')
         else if (err.response.data.errors.Address)
            show_alert(err.response.data.errors.Address, 'warning')
      }
   }
}
