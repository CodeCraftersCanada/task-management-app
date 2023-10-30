import axios from "axios";
import { API_BASE_URL } from "../../config";

export const signIn = (email, password) => {
	return axios.post(`${API_BASE_URL}/api/signin`, {
		email: email,
		password: password,
	});
};
