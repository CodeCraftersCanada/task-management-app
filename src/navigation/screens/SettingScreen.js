import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const SettingScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>SettingScreen</Text>
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

export default SettingScreen;
