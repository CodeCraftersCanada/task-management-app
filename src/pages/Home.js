import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	Dimensions,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CardComplete from "../components/CardComplete";
import CardInprogress from "../components/CardInprogress";
import images from "../utils/imageAssets";
import { getTasks } from "../services/homeService";

const { width } = Dimensions.get("window");

const Home = React.memo(({ navigation }) => {
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [ongoingTasks, setOngoingTasks] = useState([]);
	const [filteredCompletedTasks, setFilteredCompletedTasks] = useState([]);
	const [filteredOngoingTasks, setFilteredOngoingTasks] = useState([]);
	const [search, setSearch] = useState("");

	const fetchTasks = async () => {
		try {
			const completedTasksResponse = await getTasks(
				token,
				3,
				userInfo.user_type_id,
				userInfo._id
			);
			if (completedTasksResponse.data && completedTasksResponse.data.status) {
				setCompletedTasks(completedTasksResponse.data.tasks);
			}

			const ongoingTasksResponse = await getTasks(
				token,
				2,
				userInfo.user_type_id,
				userInfo._id
			);
			if (ongoingTasksResponse.data && ongoingTasksResponse.data.status) {
				setOngoingTasks(ongoingTasksResponse.data.tasks);
			}
		} catch (error) {
			console.log("Error fetching tasks: ", error);
			// Handle errors as needed
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchTasks();
		});

		return unsubscribe;
	}, [navigation]);

	const handleUpdate = () => {
		fetchTasks();
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Filtering logic

			const allTasks = [...completedTasks, ...ongoingTasks];
			const filteredResults = allTasks.filter((task) =>
				task.title.includes(search)
			);

			setFilteredCompletedTasks(
				filteredResults.filter((task) => task.task_status_id === 3)
			);
			setFilteredOngoingTasks(
				filteredResults.filter((task) => task.task_status_id === 2)
			);
		}, 500); // 500ms delay
		return () => clearTimeout(delayDebounceFn);
	}, [search, completedTasks, ongoingTasks]);

	const renderItem = ({ item }) => {
		return (
			<CardInprogress
				task={item}
				handleUpdate={handleUpdate}
				navigation={navigation}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.columnLeft}>
					<View>
						<Text style={styles.smallLabel}>Welcome Back!</Text>
						<Text style={styles.largeLabel}>{userInfo.name}</Text>
					</View>
				</View>
				<View style={styles.columnRight}>
					<TouchableOpacity onPress={() => navigation.navigate("Setting")}>
						<Image style={styles.image} source={images[userInfo.filename]} />
					</TouchableOpacity>
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
							onChangeText={setSearch}
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
					<TouchableOpacity
						onPress={() => navigation.navigate("Tasks", { status: 3 })}
					>
						<Text style={styles.mediumLabel}>See all</Text>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollViewContainer}
			>
				{filteredCompletedTasks.map((task, index) => (
					<View style={styles.card} key={task._id}>
						<CardComplete
							active={index === 0}
							task={task}
							handleUpdate={handleUpdate}
							navigation={navigation}
						/>
					</View>
				))}
			</ScrollView>

			<View style={styles.row}>
				<View style={styles.columnLeftLabel}>
					<Text style={styles.largeLabel}>Ongoing Projects</Text>
				</View>
				<View style={styles.columnButton}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Tasks", { status: 2 })}
					>
						<Text style={styles.mediumLabel}>See all</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View>
				<FlatList
					data={filteredOngoingTasks}
					renderItem={renderItem}
					keyExtractor={(item, index) => item._id || index.toString()}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>
			</View>
		</View>
	);
});

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
		width: "70%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0,
	},
	columnRight: {
		width: "30%",
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
