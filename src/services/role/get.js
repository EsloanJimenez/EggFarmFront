import axios from "axios";
import { show_alert } from "../../utils/swal";
import { API_BASE_URL } from "../../utils/apiBaseURL";

export const getRole = async () => {
   try {
      var res = await axios(`${API_BASE_URL}role`);
      return await res.data;
   } catch (err) {
      show_alert(err, 'error');
   }
}