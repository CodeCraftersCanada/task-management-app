import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "../navigation/MainContainer";
import Login from "../features/authentication/Login";
import Register from "../features/authentication/Register";
import SettingScreen from "../navigation/screens/SettingScreen";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import BillingDetail from "./BillingDetail";
import HeaderTitleContext from "../context/HeaderTitleContext";
import { useSetHeaderTitle } from "../context/HeaderTitleContext";

const Stack = createStackNavigator();

const AppContainer = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const [headerTitle, setHeaderTitle] = useState("Home");
	const screenOptions = () => ({
		headerShown: true,
		headerStyle: {
			backgroundColor: "#212832",
		},
		headerTintColor: "#FFF",
		headerTitle: headerTitle,
	});
	return (
		<HeaderTitleContext.Provider value={{ headerTitle, setHeaderTitle }}>
			<Stack.Navigator screenOptions={screenOptions}>
				{isLoggedIn ? (
					<>
						<Stack.Screen name="Main">
							{(props) => <MainContainer {...props} />}
						</Stack.Screen>

						<Stack.Screen
							name="Setting"
							component={SettingScreen}
							options={{ headerBackTitle: "Back" }}
						/>
						<Stack.Screen
							name="Tasks"
							component={TaskList}
							options={{ headerBackTitle: "Back" }}
						/>
						<Stack.Screen
							name="Task Detail"
							component={TaskDetail}
							options={{ headerBackTitle: "Back" }}
						/>
						<Stack.Screen
							name="Billing Detail"
							component={BillingDetail}
							options={{ headerBackTitle: "Back" }}
						/>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{ headerShown: false }}
						/>
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
		</HeaderTitleContext.Provider>
	);
};

export default AppContainer;
