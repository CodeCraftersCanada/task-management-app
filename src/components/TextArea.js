import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const TextArea = () => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.textarea} multiline numberOfLines={4} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// Container styles
	},
	textarea: {
		height: 100,
		textAlignVertical: "top",
		borderWidth: 0,
		borderColor: "#e1e1e1",
		borderRadius: 0,
		paddingHorizontal: 10,
		paddingTop: 10,
		fontSize: 16,
		backgroundColor: "#455A64",
		color: "white",
		marginBottom: 12,
	},
});

export default TextArea;
