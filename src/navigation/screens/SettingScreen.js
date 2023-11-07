import React, { useEffect, useContext, useLayoutEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

import Setting from "../../components/Setting";

const SettingScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: "Setting" });
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<Setting></Setting>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: "#212832",
	},
});

export default SettingScreen;
