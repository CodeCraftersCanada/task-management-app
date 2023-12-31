import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, Text, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import MemberScreen from "./screens/MemberScreen";
import BillingScreen from "./screens/BillingScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

import { useSetHeaderTitle } from "../context/HeaderTitleContext";

const homeName = "Home";
const memberName = "Members";
const billingName = "Billing";
const newTaskName = "New Task";

const Tab = createBottomTabNavigator();

const MainContainer = ({ navigation }) => {
	const userInfo = useSelector((state) => state.auth.user);
	const setHeaderTitle = useSetHeaderTitle();

	useEffect(
		React.useCallback(() => {
			const routeName =
				navigation.getState().routes[navigation.getState().index].name;
			let headerTitle = "";

			if (navigation.getState().routes[0].state) {
				const routeIndex = navigation.getState().routes[0].state.index;
				switch (routeIndex) {
					case 0:
						headerTitle = "Home";
						break;
					case 1:
						headerTitle = "Billing";
						break;
					case 2:
						headerTitle = "Members";
						break;
					case 3:
						headerTitle = "New Task";
						break;
					default:
						headerTitle = "Home";
				}
			}
			setHeaderTitle(headerTitle);
		}, [navigation, setHeaderTitle])
	);

	return (
		<Tab.Navigator
			initialRouteName={homeName}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let rn = route.name;

					if (rn === homeName) {
						iconName = focused ? "home" : "home-outline";
					} else if (rn === memberName) {
						iconName = focused ? "person" : "person-outline";
					} else if (rn === billingName) {
						iconName = focused ? "cash" : "cash-outline";
					} else if (rn === newTaskName) {
						iconName = focused ? "add-circle" : "add-circle-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				headerShown: false,
				tabBarOptions: {
					labelStyle: {
						fontSize: 14,
					},
					tabStyle: {
						width: 100,
					},
				},
				tabBarStyle: {
					...(Platform.OS === "android"
						? {
								height: 60,
								paddingTop: 10,
								paddingBottom: 10,
								borderTopWidth: 0,
								backgroundColor: "#263238",
						  }
						: {
								// Styles for other platforms
								height: 90,
								paddingTop: 10,
								borderTopWidth: 0,
								backgroundColor: "#263238",
						  }),
				},
				headerStyle: {
					backgroundColor: "#212832",
				},
				headerTintColor: "#FFF",
				headerShadowVisible: false,
				tabBarActiveTintColor: "#FED36A",
				tabBarInActiveTintColor: "#617D8A",
			})}
		>
			<Tab.Screen name={homeName} component={HomeScreen} />
			<Tab.Screen name={billingName} component={BillingScreen} />
			{userInfo.user_type_id == 1 && (
				<>
					<Tab.Screen name={memberName} component={MemberScreen} />
					<Tab.Screen name={newTaskName} component={NewTaskScreen} />
				</>
			)}
		</Tab.Navigator>
	);
};

export default MainContainer;
