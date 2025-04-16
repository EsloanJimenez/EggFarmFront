import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getOrder = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Orders`);
      return await res.data;
   } catch (err) {
      console.log(`Error al obtener las ordenes. : ${err}`);
      throw err;
   }
}