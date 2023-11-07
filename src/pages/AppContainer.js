import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "../navigation/MainContainer";
import Login from "../features/authentication/Login";
import Register from "../features/authentication/Register";
import SettingScreen from "../navigation/screens/SettingScreen";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

const Stack = createStackNavigator();

const AppContainer = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: "#212832",
				},
				headerTintColor: "#FFF",
			}}
		>
			{isLoggedIn ? (
				<>
					<Stack.Screen name="Home" component={MainContainer} />
					<Stack.Screen name="Setting" component={SettingScreen} />
					<Stack.Screen name="Tasks" component={TaskList} />
					<Stack.Screen name="Task Detail" component={TaskDetail} />
				</>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={Login}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default AppContainer;
