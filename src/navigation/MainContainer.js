import * as React from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import TaskListScreen from "./screens/TaskListScreen";
import MemberScreen from "./screens/MemberScreen";
import BillingScreen from "./screens/BillingScreen";

const homeName = "Home";
const taskListName = "Tasks";
const memberName = "Members";
const billingName = "Billing";

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
					} else if (rn === taskListName) {
						iconName = focused ? "list" : "list-outline";
					} else if (rn === memberName) {
						iconName = focused ? "person" : "person-outline";
					} else if (rn === billingName) {
						iconName = focused ? "cash" : "cash-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarOptions: {
					labelStyle: {
						fontSize: 12,
					},
					tabStyle: {
						width: 100,
					},
					style: {
						paddingTop: 50,
						backgroundColor: "red",
					},
				},
				tabBarActiveTintColor: "tomato",
				tabBarInActiveTintColor: "grey",
			})}
		>
			<Tab.Screen name={homeName} component={HomeScreen} />
			<Tab.Screen name={taskListName} component={TaskListScreen} />
			<Tab.Screen name={billingName} component={BillingScreen} />
			<Tab.Screen name={memberName} component={MemberScreen} />
		</Tab.Navigator>
	);
};

export default MainContainer;
