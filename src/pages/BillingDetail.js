import React, { useState, useLayoutEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const BillingDetail = ({ route, navigation }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		start_date: "",
		end_date: "",
	});

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
					<Text style={styles.fieldLabel}>Task Title</Text>
				</View>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						placeholderTextColor="#6F8793"
						onChangeText={(value) => handleInputChange("title", value)}
						value={formData.title}
					/>
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
	},
	fieldLabel: {
		alignSelf: "flex-start",
		color: "white",
		fontSize: 16,
		fontWeight: "400",
		marginTop: 10,
		marginBottom: 5,
	},
	input: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0,
		marginBottom: 12,
		paddingHorizontal: 12,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: 18,
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
