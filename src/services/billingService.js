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

const addInvoice = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(`${API_BASE_URL}/api/invoice`, data, config);
};

export { getInvoices, addInvoice };