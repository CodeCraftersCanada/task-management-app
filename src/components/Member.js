import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TextInput,
	Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Member = () => {
	const [search, setSearch] = useState("");

	const handleSearchChange = () => {
		console.log("search");
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

				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<Image
							style={styles.image}
							source={require("../assets/img/dummy.png")}
						/>
					</View>
					<View style={styles.columnRight}>
						<Text style={styles.nameLabel}>John Smith</Text>
						<Text style={styles.hourLabel}>$40 / hr</Text>
					</View>
					<View style={styles.columnEnd}>
						<Text style={styles.nameLabel}>Total Earning</Text>
						<Text style={styles.hourLabel}>$40,000</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<Image
							style={styles.image}
							source={require("../assets/img/dummy1.png")}
						/>
					</View>
					<View style={styles.columnRight}>
						<Text style={styles.nameLabel}>Jane Smith</Text>
						<Text style={styles.hourLabel}>$40 / hr</Text>
					</View>
					<View style={styles.columnEnd}>
						<Text style={styles.nameLabel}>Total Earning</Text>
						<Text style={styles.hourLabel}>$40,000</Text>
					</View>
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
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
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
		width: "20%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	columnRight: {
		width: "50%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnEnd: {
		width: "30%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	image: {
		width: 47,
		height: 47,
	},
	nameLabel: {
		fontSize: 14,
		fontWeight: "bold",
		color: "white",
	},
	hourLabel: {
		fontSize: 14,
		fontWeight: "400",
		color: "#B8B8B8",
	},
});

export default Member;
