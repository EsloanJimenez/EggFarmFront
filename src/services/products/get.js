import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getProducts = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Products`);

      return await res.data;
   } catch (err) {
      console.log(`Error al obtener los clientes. : ${err}`);
      throw err;
   }
}