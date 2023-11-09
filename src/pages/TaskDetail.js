import React, { useEffect, useContext, useLayoutEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	Images,
	ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { formatDate } from "../utils/formatDate";
import images from "../utils/imageAssets";

const TaskDetail = ({ route, navigation }) => {
	const { task } = route.params || { task: {} };

	const handleAdd = () => {
		console.log("handleAdd");
	};

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: "Task Detail" });
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.row}>
					<Text style={styles.taskTitle}>{task.title}</Text>
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
						<Progress.Circle
							size={90}
							progress={
								task.sub_tasks.filter((subTask) => subTask.task_status_id === 1)
									.length / task.sub_tasks.length
							}
							showsText={true}
							thickness={3}
							color={"#FED36A"}
							unfilledColor={"#263238"}
							borderColor={"#263238"}
							textStyle={{
								color: "white",
							}}
							direction={"clockwise"}
						/>
					</View>
				</View>
				<View style={styles.row}>
					<Text style={styles.taskDescription}>All Tasks</Text>
				</View>

				<ScrollView
					vertical
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollViewContainer}
				>
					{task.sub_tasks.map((subtask, index) => (
						<View style={styles.row} key={subtask.id}>
							<View style={styles.card}>
								<View style={styles.cardLeft}>
									<Text style={styles.taskDescription}>{subtask.title}</Text>
								</View>
								<View style={styles.cardRight}>
									<View style={styles.cardRightIcon}>
										{subtask.task_status_id == 2 ? (
											<Ionicons
												name={"checkmark-circle-outline"}
												size={28}
												color={"#263238"}
											/>
										) : (
											<Ionicons
												name={"ellipse-outline"}
												size={28}
												color={"#263238"}
											/>
										)}
									</View>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
			{task.task_status_id < 3 && (
				<View style={styles.fixedButtonContainer}>
					<TouchableOpacity style={styles.fixedButton} onPress={handleAdd}>
						<Text style={styles.fixedButtonText}>Add Task</Text>
					</TouchableOpacity>
				</View>
			)}
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
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	fixedButtonText: {
		color: "#000",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default TaskDetail;
