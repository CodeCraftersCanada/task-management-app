import React from "react";
import { useSelector } from "react-redux";
//import selectIsLoggedIn from "../stores/authSlice";
import MainContainer from "../navigation/MainContainer";
import Login from "../features/authentication/Login";

const AppContainer = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	//const isLoggedIn = useSelector(selectIsLoggedIn);

	return isLoggedIn ? <MainContainer /> : <Login />;
};

export default AppContainer;
