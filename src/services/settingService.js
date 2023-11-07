import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useSelector } from "react-redux";

const updateUser = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.put(`${API_BASE_URL}/api/user/${data.id}`, data, config);
};

export { updateUser };
