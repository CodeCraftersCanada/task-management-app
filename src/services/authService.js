import axios from "axios";
import { API_BASE_URL } from "../../config";

const signIn = (email, password) => {
	return axios.post(`${API_BASE_URL}/api/signin`, {
		email: email,
		password: password,
	});
};

const signUp = (name, email, password) => {
	return axios.post(`${API_BASE_URL}/api/signup`, {
		name: name,
		email: email,
		password: password,
		user_type_id: 2,
		user_role_id: 2,
		hourly_rate: 0,
	});
};

export { signIn, signUp };
