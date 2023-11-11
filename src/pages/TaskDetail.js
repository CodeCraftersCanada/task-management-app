import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { formatDate } from "../utils/formatDate";
import images from "../utils/imageAssets";
import {
	updateSubTask,
	updateTask,
	addSubtask,
} from "../services/taskDetailService";

const TaskDetail = ({ route, navigation }) => {
	const { task, onTaskUpdate } = route.params || {
		task: {},
		onTaskUpdate: () => {},
	};
	const [taskState, setTaskState] = useState(task);
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [showAddSubtaskInput, setShowAddSubtaskInput] = useState(false);
	const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
	const [calculatedProgress, setCalculatedProgress] = useState(0);

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: "Task Detail" });
	}, [navigation]);

	useEffect(() => {
		const newProgress =
			taskState.sub_tasks.length > 0
				? parseFloat(
						(
							taskState.sub_tasks.filter(
								(subTask) => subTask.task_status_id === 2
							).length / taskState.sub_tasks.length
						).toFixed(2)
				  )
				: 0;
		setCalculatedProgress(newProgress);
	}, [taskState]);

	const handleAdd = (title, token) => {
		const newSubtask = {
			title: title,
			task_id: taskState.id, // Assuming this should be taskState.id, not task.id
			task_status_id: 1,
			created_by: userInfo.id,
			assigned_to: userInfo.id,
			task_hours: 0,
		};

		addSubtask(newSubtask, token)
			.then((response) => {
				if (response.data && response.data.status) {
					// Create a new task object with updated sub_tasks
					const newSubtaskFromResponse = response.data.subTask;
					const updatedTask = {
						...taskState,
						sub_tasks: [...taskState.sub_tasks, newSubtaskFromResponse],
					};
					setTaskState(updatedTask);
					onTaskUpdate();
					setShowAddSubtaskInput(false);
					setNewSubtaskTitle("");
					Alert.alert("Success", response.data.message);
				}
			})
			.catch((error) => {
				console.error("Error adding subtask:", error);
				Alert.alert(
					"Error",
					"Failed to add subtask: " +
						(error.response ? error.response.data.message : error.message)
				);
			});
	};

	const handleUpdateTaskStatus = () => {
		if (calculatedProgress != 1) {
			Alert.alert("Subtasks are not all mark as complete.");
		} else {
			task.task_status_id = 3;
			updateTask(task, token)
				.then((response) => {
					if (response.data && response.data.status) {
						setTask(task);
						onTaskUpdate();
						Alert.alert("Success", response.data.message);
					}
				})
				.catch((error) => {
					Alert.alert("Error", "Failed to update task!");
				});
		}
	};

	const handleUpdateSubtaskStatus = (subtask, statusId, token) => {
		const subtaskIndex = task.sub_tasks.findIndex((st) => st.id === subtask.id);
		if (subtaskIndex !== -1) {
			const updatedTask = { ...task };

			updatedTask.sub_tasks[subtaskIndex].task_status_id = statusId;

			updateSubTask(updatedTask.sub_tasks[subtaskIndex], token)
				.then((response) => {
					if (response.data && response.data.status) {
						setTaskState(updatedTask);
						onTaskUpdate();
						Alert.alert("Success", response.data.message);
					}
				})
				.catch((error) => {
					Alert.alert("Error", "Failed to update task!");
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.row}>
					<View style={styles.cardLeft}>
						<Text style={styles.taskTitle}>{task.title}</Text>
					</View>
					<View style={styles.cardRight}>
						<View>
							{task.task_status_id == 3 ? (
								<TouchableOpacity>
									<Ionicons
										name={"checkmark-circle-outline"}
										size={28}
										color={"#FED36A"}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => handleUpdateTaskStatus(task, token)}
								>
									<Ionicons
										name={"ellipse-outline"}
										size={24}
										color={"white"}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<View style={styles.row}>
							<View style={[styles.columnLeft, styles.columnLeft20]}>
								<View style={styles.columnIcon}>
									<Ionicons name={"calendar"} size={28} color={"#263238"} />
								</View>
							</View>
							<View style={[styles.columnRight, styles.columnRight80]}>
								<Text style={styles.smallLabel}>Due Date</Text>
								<Text style={styles.mediumLabel}>
									{formatDate(task.end_date)}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.columnRight}>
						<View style={styles.row}>
							<View style={[styles.columnLeft, styles.columnLeft20]}>
								<View style={styles.columnIcon}>
									<Ionicons name={"people"} size={28} color={"#263238"} />
								</View>
							</View>
							<View style={[styles.columnRight, styles.columnRight80]}>
								<Text style={styles.smallLabel}>Project Team</Text>
								<Image
									style={styles.image}
									source={images[task.assigned.filename]}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<View style={styles.row}>
							<View style={[styles.columnLeft, styles.columnLeft20]}>
								<View style={styles.columnIcon}>
									<Ionicons
										name={"hourglass-outline"}
										size={28}
										color={"#263238"}
									/>
								</View>
							</View>
							<View style={[styles.columnRight, styles.columnRight80]}>
								<Text style={styles.smallLabel}>Total Hours</Text>
								<Text style={styles.mediumLabel}>{task.task_hours}</Text>
							</View>
						</View>
					</View>
					<View style={styles.columnRight}>
						<View style={styles.row}>
							<View style={[styles.columnLeft, styles.columnLeft20]}>
								<View style={styles.columnIcon}>
									<Ionicons name={"cash-outline"} size={28} color={"#263238"} />
								</View>
							</View>
							<View style={[styles.columnRight, styles.columnRight80]}>
								<Text style={styles.smallLabel}>Total Cost</Text>
								<Text style={styles.mediumLabel}>
									${task.task_hours * task.assigned.hourly_rate}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.row}>
					<Text style={styles.taskDescription}>Task Description</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.taskDescriptionContent}>{task.description}</Text>
				</View>
				<View style={styles.row}>
					<View style={[styles.columnLeft, styles.columnLeftProgress]}>
						<Text style={styles.taskDescription}>Project Progress</Text>
					</View>
					<View style={[styles.columnRight, styles.columnRightProgress]}>
						{task.task_status_id < 3 && (
							<Progress.Circle
								size={70}
								progress={calculatedProgress}
								showsText={true}
								thickness={3}
								color={"#FED36A"}
								unfilledColor={"#263238"}
								borderColor={"#263238"}
								textStyle={{
									color: "white",
								}}
								direction={"clockwise"}
								formatText={(progress) => {
									const percent = (progress * 100).toFixed(0);
									return `${percent}%`;
								}}
								key={calculatedProgress}
								animated={false}
							/>
						)}
						{task.task_status_id == 3 && (
							<Progress.Circle
								size={90}
								progress={calculatedProgress}
								showsText={true}
								thickness={3}
								color={"#FED36A"}
								unfilledColor={"#263238"}
								borderColor={"#263238"}
								textStyle={{
									color: "white",
								}}
								direction={"clockwise"}
								formatText={(progress) => {
									const percent = (1 * 100).toFixed(0);
									return `${percent}%`;
								}}
								animated={false}
							/>
						)}
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.cardLeft}>
						<Text style={styles.taskDescription}>All Tasks</Text>
					</View>
					<View style={styles.cardRight}>
						{task.task_status_id < 3 && (
							<View>
								<TouchableOpacity onPress={() => setShowAddSubtaskInput(true)}>
									<Ionicons name={"add-outline"} size={28} color={"white"} />
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
				{showAddSubtaskInput && (
					<TextInput
						style={styles.input}
						placeholder="Enter subtask title"
						placeholderTextColor="#6F8793"
						onChangeText={setNewSubtaskTitle}
						value={newSubtaskTitle}
						onBlur={() => handleAdd(newSubtaskTitle, token)}
					/>
				)}
				<ScrollView
					vertical
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollViewContainer}
				>
					{taskState.sub_tasks.map((subtask, index) => (
						<View style={styles.row} key={subtask.id}>
							<View style={styles.card}>
								<View style={styles.cardLeft}>
									<Text style={styles.taskDescription}>{subtask.title}</Text>
								</View>
								<View style={styles.cardRight}>
									<View style={styles.cardRightIcon}>
										{subtask.task_status_id == 2 ? (
											<TouchableOpacity
												style={styles.fixedButton}
												onPress={() =>
													handleUpdateSubtaskStatus(subtask, 1, token)
												}
											>
												<Ionicons
													name={"checkmark-circle-outline"}
													size={24}
													color={"#263238"}
												/>
											</TouchableOpacity>
										) : (
											<TouchableOpacity
												style={styles.fixedButton}
												onPress={() =>
													handleUpdateSubtaskStatus(subtask, 2, token)
												}
											>
												<Ionicons
													name={"ellipse-outline"}
													size={24}
													color={"#263238"}
												/>
											</TouchableOpacity>
										)}
									</View>
								</View>
							</View>
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
		paddingTop: 20,
	},
	wrapper: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	taskTitle: {
		fontWeight: "600",
		fontSize: 21,
		color: "#FFF",
	},
	smallLabel: {
		fontWeight: "500",
		fontSize: 11,
		color: "#8CAAB9",
	},
	mediumLabel: {
		fontWeight: "600",
		fontSize: 17,
		color: "#FFF",
	},
	columnLeft: {
		width: "50%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	columnRight: {
		width: "50%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	columnLeft20: {
		width: "35%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRight80: {
		width: "65%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnIcon: {
		backgroundColor: "#FED36A",
		width: 47,
		height: 47,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 20,
		height: 20,
		borderRadius: 100,
	},
	taskDescription: {
		fontWeight: "500",
		fontSize: 18,
		color: "#FFF",
	},
	taskDescriptionContent: {
		fontWeight: "400",
		fontSize: 12,
		color: "#BCCFD8",
	},
	columnLeftProgress: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRightProgress: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#455A64",
		padding: 10,
	},
	cardLeft: {
		justifyContent: "center",
		alignItems: "flex-start",
		width: "70%",
	},
	cardRight: {
		justifyContent: "center",
		alignItems: "flex-end",
		width: "30%",
	},
	cardRightIcon: {
		backgroundColor: "#FED36A",
		padding: 5,
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 30,
		left: 10,
		right: 10,
	},
	fixedButton: {
		backgroundColor: "#FED36A",
		padding: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	fixedButtonText: {
		color: "#000",
		fontSize: 18,
		fontWeight: "600",
	},
	input: {
		marginBottom: 10,
		height: 40,
		borderWidth: 0,
		paddingHorizontal: 12,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: 18,
	},
});

export default TaskDetail;
