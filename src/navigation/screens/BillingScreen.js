import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSetHeaderTitle } from "../../context/HeaderTitleContext";

import Billing from "../../pages/Billing";

const BillingScreen = ({ navigation }) => {
	const setHeaderTitle = useSetHeaderTitle();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setHeaderTitle("Billing");
		});

		return unsubscribe;
	}, [navigation, setHeaderTitle]);

	return (
		<View style={styles.container}>
			<Billing />
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

export default BillingScreen;
