import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Member from "../../components/Member";

const MemberScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Member />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MemberScreen;
