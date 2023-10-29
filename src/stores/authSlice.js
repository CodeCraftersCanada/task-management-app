import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	// additional fields like user information can go here
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
		},
		// other reducers can go here
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
