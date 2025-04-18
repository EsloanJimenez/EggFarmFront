import axios from "axios";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const deleteOrderDetails = async (id, userId) => {
   const res = await axios.delete(`${API_BASE_URL}OrderDetails/${id}`, {
      data: {
         OrderDetailId: id,
         UserDelete: userId
      }
   });
}