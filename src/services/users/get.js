import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getUsers = async () => {
   try {
      const res = await axios(`${API_BASE_URL}Users`);

      return res.data;
   } catch (ex) {

   }
}