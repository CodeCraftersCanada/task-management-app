import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	Dimensions,
	FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CardComplete from "../components/CardComplete";
import CardInprogress from "../components/CardInprogress";

const { width } = Dimensions.get("window");

const Home = () => {
	const [search, setSearch] = useState("");

	const DATA = [
		{ id: "1", title: "First Item" },
		{ id: "2", title: "Second Item" },
		{ id: "3", title: "Third Item" },
	];

	const handleSearchChange = () => {
		console.log("search");
	};

	const renderItem = ({ item }) => <CardInprogress />;

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.columnLeft}>
					<View>
						<Text style={styles.smallLabel}>Welcome Back!</Text>
						<Text style={styles.largeLabel}>Tim Horton</Text>
					</View>
				</View>
				<View style={styles.columnRight}>
					<Image
						style={styles.image}
						source={require("../assets/img/dummy.png")}
					/>
				</View>
			</View>

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
				<View style={styles.columnLeftLabel}>
					<Text style={styles.largeLabel}>Completed Tasks</Text>
				</View>
				<View style={styles.columnButton}>
					<Text style={styles.mediumLabel}>See all</Text>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollViewContainer}
			>
				<View style={styles.card}>
					<CardComplete active={true} />
				</View>
				<View style={styles.card}>
					<CardComplete />
				</View>
				<View style={styles.card}>
					<CardComplete active={true} />
				</View>
			</ScrollView>

			<View style={styles.row}>
				<View style={styles.columnLeftLabel}>
					<Text style={styles.largeLabel}>Ongoing Projects</Text>
				</View>
				<View style={styles.columnButton}>
					<Text style={styles.mediumLabel}>See all</Text>
				</View>
			</View>

			<View>
				<FlatList
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: {
		alignItems: "center",
		paddingStart: 5,
		paddingEnd: 5,
	},
	card: {
		backgroundColor: "#455A64",
		width: width * 0.55,
		height: 180,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		marginRight: 10,
	},
	cardText: {
		fontSize: 18,
	},
	container: {
		marginTop: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
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
	mediumLabel: {
		color: "#FED36A",
		fontSize: 16,
		fontWeight: "400",
	},
	image: {
		borderRadius: 50,
		width: 50,
		height: 50,
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
	searchWrapper: {
		width: "auto",
	},
	filterColumn: {
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FED36A",
		borderRadius: 2,
	},
	columnLeftLabel: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		position: "relative",
	},
	columnButton: {
		width: "20%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	scrollViewContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
});

export default Home;
