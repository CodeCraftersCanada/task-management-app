import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	token: null,
	// additional fields like user information can go here
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.token = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = null;
		},
		// other reducers can go here
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
