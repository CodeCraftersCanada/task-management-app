import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function BillingScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>BillingScreen</Text>
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
