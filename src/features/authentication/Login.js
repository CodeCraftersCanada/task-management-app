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
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../../stores/authSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		signIn(email, password)
			.then((response) => {
				if (response.data && response.data.status) {
					Alert.alert("Success", response.data.message);
					try {
						dispatch(login(response.data.token));
					} catch (error) {
						console.log("Dispatch error: ", error);
					}
					navigation.reset({
						index: 0,
						routes: [{ name: "Home" }],
					});
				}
			})
			.catch((error) => {
				Alert.alert("Error", "Invalid credentials!");
			});
	};

	const handleSignUp = () => {
		navigation.navigate("Register");
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
				name="email"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="white"
				secureTextEntry
				onChangeText={setPassword}
				value={password}
				name="password"
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text className="text-xl font-semibold">Login</Text>
			</TouchableOpacity>
			<View className="flex-row items-center justify-center mt-4">
				<Text className="text-primary-gray text-base font-semibold">
					Don’t have an account?
				</Text>
				<Text
					className="text-primary-yellow text-base font-semibold ml-2"
					onPress={handleSignUp}
				>
					Sign Up
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
		height: 50,
		borderColor: "gray",
		borderWidth: 0,
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

export default Login;
