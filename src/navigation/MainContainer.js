import * as React from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import TaskListScreen from "./screens/TaskListScreen";
import MemberScreen from "./screens/MemberScreen";
import BillingScreen from "./screens/BillingScreen";
import NewTaskScreen from "./screens/NewTaskScreen";

const homeName = "Home";
const memberName = "Members";
const billingName = "Billing";
const newTaskName = "New Task";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
	return (
		<Tab.Navigator
			initialRouteName="{homeName}"
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
					height: 90,
					paddingTop: 10,
					borderTopWidth: 0,
					backgroundColor: "#263238",
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
			<Tab.Screen name={newTaskName} component={NewTaskScreen} />
			<Tab.Screen name={memberName} component={MemberScreen} />
		</Tab.Navigator>
	);
};

export default MainContainer;
