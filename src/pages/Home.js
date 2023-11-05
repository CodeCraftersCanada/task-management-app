import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Home = () => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.columnLeft}>
					<View>
						<Text style={styles.smallLabel}>Welcome Back!</Text>
						<Text style={styles.largeLabel}>Fazil Laghari</Text>
					</View>
				</View>
				<View style={styles.columnRight}>
					<Image
						style={styles.image}
						source={require("../assets/img/dummy.png")}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	columnLeft: {
		width: "50%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0,
	},
	columnRight: {
		width: "50%",
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	smallLabel: {
		color: "#FED36A",
		fontSize: 12,
		fontWeight: "500",
	},
	largeLabel: {
		color: "#FFF",
		fontSize: 22,
		fontWeight: "600",
	},
	image: {
		borderRadius: 50,
		width: 50,
		height: 50,
	},
});

export default Home;
