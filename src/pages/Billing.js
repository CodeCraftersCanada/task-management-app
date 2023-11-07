import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TextInput,
	Image,
	TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Billing = () => {
	const [search, setSearch] = useState("");
	const navigation = useNavigation();

	const handleSearchChange = () => {
		console.log("search");
	};

	const handlePress = () => {
		navigation.navigate("Billing Detail");
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.columnLeftLabel}>
						<View style={styles.fieldWrapper}>
							<Ionicons
								style={styles.fieldIconLeft}
								name={"search-outline"}
								size={24}
								color={"#6F8793"}
							/>
							<TextInput
								style={styles.input}
								placeholder="Search tasks"
								placeholderTextColor="#6F8793"
								onChangeText={handleSearchChange}
								value={search}
							/>
						</View>
					</View>
					<View style={styles.filterColumn}>
						<Ionicons name={"filter-outline"} size={24} color={"#6F8793"} />
					</View>
				</View>

				<TouchableOpacity onPress={handlePress}>
					<View style={[styles.row, styles.card]}>
						<View style={styles.columnLeft}>
							<Text style={styles.nameLabel}>Wireframe</Text>
							<Text style={styles.hourLabel}>03:30:00</Text>
						</View>
						<View style={styles.columnRight}>
							<Text style={styles.dollarLabel}>$160.50</Text>
						</View>
						<View style={styles.columnEnd}>
							<Image
								style={styles.image}
								source={require("../assets/img/dummy.png")}
							/>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={handlePress}>
					<View style={[styles.row, styles.card]}>
						<View style={styles.columnLeft}>
							<Text style={styles.nameLabel}>Icons</Text>
							<Text style={styles.hourLabel}>01:30:00</Text>
						</View>
						<View style={styles.columnRight}>
							<Text style={styles.dollarLabel}>$80</Text>
						</View>
						<View style={styles.columnEnd}>
							<Image
								style={styles.image}
								source={require("../assets/img/dummy1.png")}
							/>
						</View>
					</View>
				</TouchableOpacity>
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
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	card: {
		backgroundColor: "#263238",
		padding: 20,
	},
	columnLeftLabel: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		position: "relative",
	},
	fieldWrapper: {
		width: "97%",
		position: "relative",
		borderColor: "#CCC",
		backgroundColor: "#FFF",
		marginRight: 4,
	},
	fieldIconLeft: {
		position: "absolute",
		left: 16,
		top: 12,
		zIndex: 1,
	},
	input: {
		height: 54,
		borderColor: "gray",
		borderWidth: 0,
		paddingHorizontal: 50,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: 18,
	},
	filterColumn: {
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FED36A",
		borderRadius: 2,
	},
	columnLeft: {
		width: "50%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRight: {
		width: "30%",
		justifyContent: "center",
		alignItems: "center",
	},
	columnEnd: {
		width: "20%",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	image: {
		width: 47,
		height: 47,
		borderRadius: 100,
	},
	nameLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	hourLabel: {
		fontSize: 14,
		fontWeight: "200",
		color: "#D2D2D2",
	},
	dollarLabel: {
		fontSize: 16,
		fontWeight: "400",
		color: "#D2D2D2",
	},
});

export default Billing;