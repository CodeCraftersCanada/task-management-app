import React from "react";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ active }) => {
	return (
		<View style={styles.container}>
			{active ? (
				<Progress.Bar
					progress={1}
					width={null}
					style={StyleSheet.absoluteFill}
					color={"#2C4653"}
					borderColor={"white"}
				/>
			) : (
				<Progress.Bar
					progress={1}
					width={null}
					style={[StyleSheet.absoluteFill, styles.darkBg]}
					color={"white"}
					borderColor={"#2C4653"}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 8,
		width: "100%",
		borderRadius: 5,
		backgroundColor: "white",
		borderColor: "white",
	},
	darkBg: {
		backgroundColor: "#2C4653",
		borderColor: "#2C4653",
	},
});

export default ProgressBar;
