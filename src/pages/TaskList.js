import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CardComplete from "../components/CardComplete";
import CardInprogress from "../components/CardInprogress";
import { getTasks } from "../services/homeService";

const TaskList = ({ route, navigation }) => {
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [tasks, setTasks] = useState([]);
	const { status } = route.params || { status: 3 };
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [filteredTasks, setFilteredTasks] = useState([]);

	const fetchTasks = () => {
		setLoading(true);
		getTasks(token, status, userInfo.user_type_id, userInfo.id)
			.then((response) => {
				if (response.data && response.data.status) {
					setTasks(response.data.tasks);
					setFilteredTasks(response.data.tasks); // Initialize filtered tasks
				}
				setLoading(false);
			})
			.catch((error) => {
				console.log("Error fetching tasks:", error);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchTasks();
	}, [token, status, userInfo.user_type_id, userInfo.id]);

	const handleSearchChange = (text) => {
		setSearch(text);
		const filtered = tasks.filter((task) =>
			task.title.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredTasks(filtered);
	};

	useLayoutEffect(() => {
		if (status == 3) {
			navigation.setOptions({ headerTitle: "Completed Tasks" });
		} else if (status == 2) {
			navigation.setOptions({ headerTitle: "Ongoing Tasks" });
		} else {
			navigation.setOptions({ headerTitle: "Tasks" });
		}
	}, [navigation]);

	const handleUpdate = () => {
		fetchTasks();
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<Text>Loading tasks...</Text>
			</View>
		);
	}

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
				<ScrollView
					vertical
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollViewContainer}
				>
					{status == 3
						? filteredTasks.map((task, index) => (
								<View style={styles.card} key={task.id}>
									<CardComplete
										active={index === 0}
										task={task}
										handleUpdate={handleUpdate}
										navigation={navigation}
									/>
								</View>
						  ))
						: filteredTasks.map((task, index) => (
								<View style={styles.card} key={task.id}>
									<CardInprogress
										active={true}
										task={task}
										handleUpdate={handleUpdate}
										navigation={navigation}
									/>
								</View>
						  ))}
				</ScrollView>
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
	scrollViewContainer: {
		alignItems: "center",
	},
	card: {
		backgroundColor: "#455A64",
		width: "auto",
		height: 180,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		marginBottom: 10,
	},
	cardText: {
		fontSize: 18,
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
});

export default TaskList;
