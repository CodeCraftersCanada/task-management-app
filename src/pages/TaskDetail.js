import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

const TaskDetail = ({ route, navigation }) => {
	const { status } = route.params || { status: "completed" };

	return (
		<SafeAreaView style={styles.container}>
			<Text>TaskDetail {status}</Text>
		</SafeAreaView>
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

export default TaskDetail;