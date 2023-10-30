import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(/* any other middleware */),
	devTools: process.env.NODE_ENV !== "production",
	enhancers: [
		composeWithDevTools({
			realtime: true,
			hostname: "localhost",
			port: 3000,
		}),
	],
});

export default store;
