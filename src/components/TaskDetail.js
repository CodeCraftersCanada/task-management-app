import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const TaskDetail = () => {
	const [formData, setFormData] = useState({
		title: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.fieldLabel}>Task Title</Text>
			<TextInput
				style={styles.input}
				placeholderTextColor="white"
				onChangeText={handleInputChange}
				value={formData.title}
			/>
			<Text style={styles.fieldLabel}>Task Details</Text>
			<TextInput
				style={styles.input}
				placeholderTextColor="white"
				onChangeText={handleInputChange}
				value={formData.description}
			/>
			<Text style={styles.fieldLabel}>Add Team Members</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
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
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 12,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: "18px",
	},
});

export default TaskDetail;
