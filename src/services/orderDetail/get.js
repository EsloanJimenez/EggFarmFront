import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getOrderDetailId = async (id) => {
   try {
      const res = await axios(`${API_BASE_URL}OrderDetails/${id}`);
      return res.data;
   } catch (err) {
      show_alert(`Error al obtener los detalles de las ordenes. : ${err}`, 'warning');
      throw err;
   }
}