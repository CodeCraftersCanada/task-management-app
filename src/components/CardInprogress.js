import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import images from "../utils/imageAssets";
import { formatDate } from "../utils/formatDate";

const CardInprogress = ({ task, handleUpdate, navigation }) => {
	const handlePress = (task) => {
		navigation.navigate("Task Detail", {
			task: task,
			onTaskUpdate: handleUpdate,
		});
	};

	const calculatedProgress =
		task.sub_tasks.length > 0
			? parseFloat(
					(
						task.sub_tasks.filter((subTask) => subTask.task_status_id === 2)
							.length / task.sub_tasks.length
					).toFixed(2)
			  )
			: 0;

	return (
		<TouchableOpacity onPress={() => handlePress(task)}>
			<View style={[styles.cardContainer]}>
				<Text style={[styles.cardLargeText, styles.colorWhite]}>
					{task.title}
				</Text>
				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<View style={styles.row}>
							<Text style={[styles.cardSmallText, styles.colorWhite]}>
								Assign To
							</Text>
						</View>
						<View style={styles.row}>
							<Image
								style={styles.image}
								source={images[task.assigned.filename]}
							/>
						</View>
						<View style={styles.row}>
							<Text style={[styles.cardSmallText, styles.colorWhite]}>
								Due on : {formatDate(task.end_date)}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={[styles.cardSmallText, styles.colorWhite]}>
								Total Hours : {task.task_hours}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={[styles.cardSmallText, styles.colorWhite]}>
								Total Cost : ${task.task_hours * task.assigned.hourly_rate}
							</Text>
						</View>
					</View>
					<View style={[styles.columnRight]}>
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
							animated={false}
						/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		height: 160,
		padding: 10,
		backgroundColor: "#455A64",
		marginBottom: 10,
	},
	cardLargeText: {
		fontSize: 21,
		fontWeight: "bold",
	},
	cardSmallText: {
		fontSize: 14,
		color: "#212832",
	},
	cardSmallTextBold: {
		fontWeight: "bold",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 3,
	},
	rowProgressBar: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 5,
	},
	columnLeft: {
		width: "50%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 0,
	},
	columnRight: {
		width: "50%",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	image: {
		borderRadius: 50,
		width: 30,
		height: 30,
	},
	marginTop0: {
		marginTop: 0,
	},
	marginTop9: {
		marginTop: 9,
	},
	marginTop5: {
		marginTop: 6,
	},
	colorWhite: {
		color: "white",
	},
});

export default CardInprogress;
