import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import BillingCreate from "../../components/BillingCreate";

const NewBillingScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<BillingCreate />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		backgroundColor: "#212832",
	},
});

export default NewBillingScreen;
