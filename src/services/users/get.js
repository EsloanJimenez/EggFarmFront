import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getUsers = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Users`);

      return await res.data;
   } catch (ex) {

   }
}