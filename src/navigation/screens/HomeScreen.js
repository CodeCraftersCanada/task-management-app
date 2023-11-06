import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import Home from "../../pages/Home";

const HomeScreen = ({ navigation }) => {
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
