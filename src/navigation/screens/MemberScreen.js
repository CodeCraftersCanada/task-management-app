import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MemberScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>MemberScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
