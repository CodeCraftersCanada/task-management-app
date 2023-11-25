import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useSelector } from "react-redux";

const updateSubTask = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.put(`${API_BASE_URL}/api/subTask/${data._id}`, data, config);
};

const updateTask = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	return axios.put(`${API_BASE_URL}/api/tasks/${data._id}`, data, config);
};

const addSubtask = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(`${API_BASE_URL}/api/subTask`, data, config);
};

const addTask = (data, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(`${API_BASE_URL}/api/tasks`, data, config);
};

export { updateSubTask, updateTask, addSubtask, addTask };
