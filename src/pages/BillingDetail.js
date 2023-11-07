import React, { useEffect, useContext, useLayoutEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const BillingDetail = ({ route, navigation }) => {
	const { status } = route.params || { status: "completed" };

	const handleSubmit = () => {
		console.log("handleSubmit");
	};

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: "Billing Detail" });
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.row}>
					<Text style={styles.taskTitle}>Wireframe</Text>
				</View>
			</View>
			<View style={styles.fixedButtonContainer}>
				<TouchableOpacity style={styles.fixedButton} onPress={handleSubmit}>
					<Text style={styles.fixedButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#212832",
		width: "100%",
		height: "100%",
		padding: 10,
		paddingTop: 20,
	},
	wrapper: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	taskTitle: {
		fontWeight: "600",
		fontSize: 21,
		color: "#FFF",
	},
	smallLabel: {
		fontWeight: "500",
		fontSize: 11,
		color: "#8CAAB9",
	},
	mediumLabel: {
		fontWeight: "600",
		fontSize: 17,
		color: "#FFF",
	},
	columnLeft: {
		width: "50%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	columnRight: {
		width: "50%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	columnLeft20: {
		width: "35%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRight80: {
		width: "65%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnIcon: {
		backgroundColor: "#FED36A",
		width: 47,
		height: 47,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 20,
		height: 20,
	},
	taskDescription: {
		fontWeight: "500",
		fontSize: 18,
		color: "#FFF",
	},
	taskDescriptionContent: {
		fontWeight: "400",
		fontSize: 12,
		color: "#BCCFD8",
	},
	columnLeftProgress: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRightProgress: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#455A64",
		padding: 10,
	},
	cardLeft: {
		justifyContent: "center",
		alignItems: "flex-start",
		width: "70%",
	},
	cardRight: {
		justifyContent: "center",
		alignItems: "flex-end",
		width: "30%",
	},
	cardRightIcon: {
		backgroundColor: "#FED36A",
		padding: 5,
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 30,
		left: 10,
		right: 10,
	},
	fixedButton: {
		backgroundColor: "#FED36A",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	fixedButtonText: {
		color: "#000",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default BillingDetail;
