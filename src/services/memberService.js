import axios from "axios";
import { API_BASE_URL } from "../../config";

const getUsers = (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
	};

	return axios.get(`${API_BASE_URL}/api/user`, config);
};

export { getUsers };