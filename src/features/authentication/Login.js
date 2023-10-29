import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		if (username === "admin" && password === "password") {
			Alert.alert("Success", "Logged in successfully!");
		} else {
			Alert.alert("Error", "Invalid credentials!");
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={setUsername}
				value={username}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				onChangeText={setPassword}
				value={password}
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 16,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
	},
});

export default Login;
