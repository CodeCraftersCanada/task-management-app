import axios from "axios";
import { API_BASE_URL } from "../../config";

const getInvoices = (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
	};

	return axios.get(`${API_BASE_URL}/api/invoice`, config);
};

export { getInvoices };