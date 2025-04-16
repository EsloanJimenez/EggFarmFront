import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getInventory = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Inventory`);
      return await res.data;
   } catch (err) {
      console.log(`Error al obtener el inventario. : ${err}`);
      throw err;
   }
}

export const getInventoryId = async (id) => {
   try {
      const res = await axios(`${API_BASE_URL}Inventory/${id}`);
      return res.data;
   } catch (err) {
      console.log(`Error al obtener el inventario. : ${err}`);
      throw err;
   }
}