import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const TaskListScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Task list</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default TaskListScreen;
