import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

const Register = () => {
	const navigation = useNavigation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = () => {
		Alert.alert("Success", "Sign up");
	};

	const handleLogIn = () => {
		navigation.navigate("Login");
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
			<Text style={styles.welcomeText}>Create your account</Text>
			<TextInput
				style={styles.input}
				placeholder="Name"
				placeholderTextColor="white"
				onChangeText={setName}
				value={name}
			/>
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
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				placeholderTextColor="white"
				secureTextEntry
				onChangeText={setPassword}
				value={password}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSignUp}>
				<Text className="text-xl font-semibold">Sign Up</Text>
			</TouchableOpacity>
			<View className="flex-row items-center justify-center mt-4">
				<Text className="text-primary-gray text-base font-semibold">
					Already have an account?
				</Text>
				<Text
					className="text-primary-yellow text-base font-semibold ml-2"
					onPress={handleLogIn}
				>
					Log In
				</Text>
			</View>
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

export default Register;
