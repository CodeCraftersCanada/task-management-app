import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import ProgressBar from "./ProgressBar";
import images from "../utils/imageAssets";

const CardComplete = ({ active, task, handleUpdate, navigation }) => {
	const handlePress = (task) => {
		navigation.navigate("Task Detail", {
			task: task,
			onTaskUpdate: handleUpdate,
		});
	};

	const total = task.task_hours * task.assigned_to.hourly_rate;
	const formattedTotal = total.toFixed(2);

	return (
		<TouchableOpacity onPress={() => handlePress(task)}>
			<View style={[styles.cardContainer, active && styles.activeCard]}>
				<Text style={[styles.cardLargeText, !active && styles.colorWhite]}>
					{task.title}
				</Text>
				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<Text style={[styles.cardSmallText, !active && styles.colorWhite]}>
							Assign To
						</Text>
					</View>
					<View style={[styles.columnRight]}>
						<Image
							style={styles.image}
							source={images[task.assigned_to.filename]}
						/>
					</View>
				</View>
				<View style={[styles.row, styles.marginTop9]}>
					<View style={styles.columnLeft}>
						<Text style={[styles.cardSmallText, !active && styles.colorWhite]}>
							Total Hours
						</Text>
					</View>
					<View style={styles.columnRight}>
						<Text
							style={[
								styles.cardSmallText,
								styles.cardSmallTextBold,
								!active && styles.colorWhite,
							]}
						>
							{task.task_hours}
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.columnLeft}>
						<Text style={[styles.cardSmallText, !active && styles.colorWhite]}>
							Total Cost
						</Text>
					</View>
					<View style={styles.columnRight}>
						<Text
							style={[
								styles.cardSmallText,
								styles.cardSmallTextBold,
								!active && styles.colorWhite,
							]}
						>
							${formattedTotal}
						</Text>
					</View>
				</View>
				<View style={[styles.row, styles.marginTop5]}>
					<View style={styles.columnLeft}>
						<Text style={[styles.cardSmallText, !active && styles.colorWhite]}>
							Completed
						</Text>
					</View>
					<View style={styles.columnRight}>
						<Text
							style={[
								styles.cardSmallText,
								styles.cardSmallTextBold,
								!active && styles.colorWhite,
							]}
						>
							100%
						</Text>
					</View>
				</View>
				<View style={[styles.rowProgressBar, styles.marginTop0]}>
					<ProgressBar active={active} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		height: 180,
		padding: 10,
	},
	activeCard: {
		backgroundColor: "#FED36A",
	},
	cardLargeText: {
		fontSize: 21,
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
		marginTop: 5,
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
		justifyContent: "flex-end",
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

export default CardComplete;
