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
	SafeAreaView
} from "react-native";
import { signUp } from "../../services/authService";

const Register = () => {
	const navigation = useNavigation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = () => {
		signUp(name, email, password)
			.then((response) => {
				if (response.data && response.data.status) {
					Alert.alert("Success", response.data.message);
					navigation.navigate("Login");
				}
			})
			.catch((error) => {
				Alert.alert("Error", "Failed to register!");
			});
	};

	const handleLogIn = () => {
		navigation.navigate("Login");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
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
		justifyContent: "center",
		alignItems: "center",
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
	},
	image: {
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
