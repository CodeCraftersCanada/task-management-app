import axios from "axios";
import { API_BASE_URL } from "../../config";

const getMembers = (token) => {
	let params = {
		user_type_id: 2,
	};

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		params: params,
	};

	return axios.get(`${API_BASE_URL}/api/user`, config);
};

export { getMembers };
