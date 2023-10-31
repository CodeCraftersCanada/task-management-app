import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import TaskDetail from "../../components/TaskDetail";

const NewTaskScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TaskDetail />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 16,
		backgroundColor: "#212832",
		alignItems: "center",
		paddingTop: 120,
	},
});

export default NewTaskScreen;
