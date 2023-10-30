import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "../navigation/MainContainer";
import Login from "../features/authentication/Login";
import Register from "../features/authentication/Register";

const Stack = createStackNavigator();

const AppContainer = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{isLoggedIn ? (
				<Stack.Screen name="Main" component={MainContainer} />
			) : (
				<>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default AppContainer;
