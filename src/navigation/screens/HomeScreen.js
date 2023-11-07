import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useSetHeaderTitle } from "../../context/HeaderTitleContext";

import Home from "../../pages/Home";

const HomeScreen = ({ navigation }) => {
	const setHeaderTitle = useSetHeaderTitle();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setHeaderTitle("Home");
		});

		return unsubscribe;
	}, [navigation, setHeaderTitle]);

	return (
		<SafeAreaView style={styles.container}>
			<Home navigation={navigation} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		backgroundColor: "#212832",
	},
});

export default HomeScreen;
