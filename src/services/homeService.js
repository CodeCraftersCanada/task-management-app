import axios from "axios";
import { API_BASE_URL } from "../../config";

const getTasks = (token, taskStatusId, userTypeId, userId) => {
	let params = {
		task_status_id: taskStatusId,
	};

	if (userTypeId === 1) {
		params.created_by = userId;
	} else {
		params.assigned_to = userId;
	}

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		params: params,
	};

	return axios.get(`${API_BASE_URL}/api/tasks`, config);
};

const getAllTasks = (token, userTypeId, userId) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		params:
			userTypeId === 1
				? {
						created_by: userId,
				  }
				: {
						assigned_to: userId,
				  },
	};

	return axios.get(`${API_BASE_URL}/api/tasks`, config);
};

export { getTasks, getAllTasks };
