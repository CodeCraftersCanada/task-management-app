import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Setting = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		user_type_id: "",
		user_type_id: "",
		hourly_rate: "",
	});

	const handleInputChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	return (
		<SafeAreaView>
			<View style={styles.settingContainer}>
				<View
					style={[
						styles.imageWrapper,
						styles.centeredContent,
						styles.imageMarginBottom,
					]}
				>
					<View style={styles.imageFrame}>
						<Image
							style={styles.image}
							source={require("../assets/img/dummy.png")}
						/>
					</View>
					<View style={[styles.imageAddWrapper, styles.centeredContent]}>
						<View style={styles.addIconFrame}>
							<Ionicons name={"add-outline"} size={18} color={"#FFF"} />
						</View>
					</View>
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
						placeholder="Name"
						placeholderTextColor="#6F8793"
						onChangeText={(value) => handleInputChange("name", value)}
						value={formData.name}
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
						name={"mail-outline"}
						size={24}
						color={"#8CAAB9"}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						placeholderTextColor="#6F8793"
						onChangeText={(value) => handleInputChange("email", value)}
						value={formData.email}
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
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	settingContainer: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#212832",
		marginTop: 10,
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
		width: "39%",
		alignSelf: "center",
	},
	image: {},
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
});

export default Setting;
