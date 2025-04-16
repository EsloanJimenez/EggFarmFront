import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getCustomers = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Customers`);

      return await res.data;
   } catch (err) {
      console.log(`Error al obtener los clientes. : ${err}`);
      throw err;
   }
}