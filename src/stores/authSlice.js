import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	token: null,
	userTypeId: null,
	filename: null,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.token = action.payload.token;
			state.userTypeId = action.payload.user.user_type_id;
			state.filename = action.payload.user.filename;
			state.user = action.payload.user;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = null;
			state.userTypeId = null;
			state.filename = null;
			state.user = null;
		},
		// other reducers can go here
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
