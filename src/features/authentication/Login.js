import React, { useState } from "react";
import {
	View,
	TextInput,
	Button,
	Alert,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		if (email === "admin" && password === "password") {
			Alert.alert("Success", "Logged in successfully!");
		} else {
			Alert.alert("Error", "Invalid credentials!");
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../../assets/img/logo.png")}
			/>
			<View className="flex-row items-center justify-center">
				<Text className="text-white text-2xl font-semibold">Twin</Text>
				<Text className="text-primary-yellow text-2xl font-semibold">Tech</Text>
			</View>
			<Text style={styles.welcomeText}>Welcome Back!</Text>
			<TextInput
				style={styles.input}
				placeholder="Email Address"
				placeholderTextColor="white"
				onChangeText={setEmail}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="white"
				secureTextEntry
				onChangeText={setPassword}
				value={password}
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text className="text-xl font-semibold">Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 16,
		backgroundColor: "#212832",
		alignItems: "center",
		paddingTop: 120,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
		width: "100%",
	},
	image: {
		textAlign: "center",
		marginBottom: -20,
	},
	welcomeText: {
		alignSelf: "flex-start",
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 48,
		marginBottom: 24,
	},
	button: {
		backgroundColor: "#FED36A",
		color: "white",
		fontWeight: "bold",
		paddingVertical: 12,
		paddingHorizontal: 4,
		borderRadius: 8,
		width: "100%",
		alignItems: "center",
	},
});

export default Login;
