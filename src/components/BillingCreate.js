import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BillingCreate = () => {
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);

	const [formData, setFormData] = useState({
	});

	const handleInputChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleSubmit = () => {
		console.log("handleSubmit ");
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.settingContainer}>

                    <View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"mail-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Task"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("task_id", value)}
							value={formData.task_id}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>
					<View style={styles.fieldWrapper}>
						<Ionicons
							style={styles.fieldIconLeft}
							name={"person-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Paid To"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("paid_to", value)}
							value={formData.paid_to}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"hourglass-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Total Hours"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("total_hours", value)}
							value={formData.total_hours}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"cash-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Hourly Rate"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("hourly_rate", value)}
							value={formData.hourly_rate}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"cash-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Amount"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("amount", value)}
							value={formData.hourly_rate}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>
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
	centeredContent: {
		alignItems: "center",
	},
	imageWrapper: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	imageFrame: {
		borderWidth: 2,
		borderColor: "#FED36A",
		padding: 3,
		borderRadius: 100,
		width: "36.8%",
		alignSelf: "center",
	},
	image: {
		borderRadius: 100,
		width: 127,
		height: 125,
	},
	imageAddWrapper: {
		position: "absolute",
		bottom: 0,
		right: 110,
		backgroundColor: "#212832",
		borderRadius: 50,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	addIconFrame: {
		borderWidth: 2,
		borderColor: "#FFF",
		borderRadius: 5,
	},
	imageMarginBottom: {
		marginBottom: 40,
	},
	input: {
		height: 54,
		borderColor: "gray",
		borderWidth: 0,
		paddingHorizontal: 50,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: 18,
	},
	fieldWrapper: {
		marginTop: 26,
		width: "auto",
		position: "relative",
		borderWidth: 1,
	},
	fieldIconLeft: {
		position: "absolute",
		left: 16,
		top: 12,
		zIndex: 1,
	},
	fieldIconRight: {
		position: "absolute",
		right: 16,
		top: 12,
		zIndex: 1,
	},
	emailIcon: {
		top: 14,
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 10,
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
	logoutIcon: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
});

export default BillingCreate;
