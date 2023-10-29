import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // your slice reducer

const rootReducer = combineReducers({
	auth: authReducer,
	// other reducers can go here
});

export default rootReducer;
