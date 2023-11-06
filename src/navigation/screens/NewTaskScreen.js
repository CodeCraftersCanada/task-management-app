import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import TaskCreate from "../../components/TaskCreate";

const NewTaskScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TaskCreate />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		backgroundColor: "#212832",
	},
});

export default NewTaskScreen;
