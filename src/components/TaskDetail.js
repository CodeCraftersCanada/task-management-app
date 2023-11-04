import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextArea from "./TextArea";
import AutoCompleteDropdown from "./AutoCompleteDropdown";

const TaskDetail = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		start_date: "",
		end_date: "",
	});

	const handleInputChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const [isStartDatePickerVisible, setStartDatePickerVisibility] =
		useState(false);
	const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

	const [date, setDate] = useState(new Date());

	const showDatePicker = (picker) => {
		if (picker === "start") {
			setStartDatePickerVisibility(true);
		} else {
			setEndDatePickerVisibility(true);
		}
	};

	const hideDatePicker = () => {
		setStartDatePickerVisibility(false);
		setEndDatePickerVisibility(false);
	};

	const handleConfirm = (date, type) => {
		const formattedDate = formatDate(date);
		setFormData((prevState) => ({
			...prevState,
			[type]: formattedDate,
		}));
		hideDatePicker();
	};

	function formatDate(date) {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();

		return `${month}/${day}/${year}`;
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text style={styles.fieldLabel}>Task Title</Text>
				<TextInput
					style={styles.input}
					placeholderTextColor="white"
					onChangeText={(value) => handleInputChange("title", value)}
					value={formData.title}
				/>
				<Text style={styles.fieldLabel}>Task Details</Text>
				<TextArea
					onChangeText={(value) => handleInputChange("description", value)}
					value={formData.description}
				/>
				<Text style={styles.fieldLabel}>Add Team Members</Text>
				<AutoCompleteDropdown />
				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.fieldLabel}>Start Date</Text>
						<View style={styles.row}>
							<View style={styles.columnIcon}>
								<Ionicons name={"calendar"} size={28} color={"#263238"} />
							</View>
							<View style={styles.columnButton}>
								<TouchableOpacity style={styles.dateButtonContainer}>
									<Button
										title={
											formData.start_date == ""
												? "MM/DD/YY"
												: formData.start_date
										}
										style={styles.dateButton}
										onPress={() => showDatePicker("start")}
										color={"white"}
									/>
								</TouchableOpacity>
								<DateTimePickerModal
									isVisible={isStartDatePickerVisible}
									mode="date"
									minimumDate={new Date()}
									onConfirm={(date) => handleConfirm(date, "start_date")}
									onCancel={hideDatePicker}
									display="inline"
								/>
							</View>
						</View>
					</View>
					<View style={styles.column}>
						<Text style={styles.fieldLabel}>End Date</Text>
						<View style={styles.row}>
							<View style={styles.columnIcon}>
								<Ionicons name={"calendar"} size={28} color={"#263238"} />
							</View>
							<View style={styles.columnButton}>
								<TouchableOpacity style={styles.dateButtonContainer}>
									<Button
										title={
											formData.end_date == "" ? "MM/DD/YY" : formData.end_date
										}
										style={styles.dateButton}
										onPress={() => showDatePicker("end")}
										color={"white"}
									/>
								</TouchableOpacity>
								<DateTimePickerModal
									isVisible={isEndDatePickerVisible}
									mode="date"
									minimumDate={new Date()}
									onConfirm={(date) => handleConfirm(date, "end_date")}
									onCancel={hideDatePicker}
									display="inline"
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.column}>
						<Text>Column 1</Text>
					</View>
					<View style={styles.column}>
						<Text>Column 2</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	fieldLabel: {
		alignSelf: "flex-start",
		color: "white",
		fontSize: 16,
		fontWeight: "400",
		marginTop: 10,
		marginBottom: 5,
	},
	input: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0,
		marginBottom: 12,
		paddingHorizontal: 12,
		paddingVertical: 12,
		width: "100%",
		backgroundColor: "#455A64",
		color: "#FFFFFF",
		fontSize: 18,
	},
	dateButtonContainer: {},
	dateButton: {
		backgroundColor: "#455A64",
		color: "white",
		fontWeight: "bold",
		paddingVertical: 12,
		paddingHorizontal: 4,
		borderRadius: 8,
		width: "100%",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	column: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 10,
		marginBottom: 10,
		padding: 4,
	},
	columnIcon: {
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#FED36A",
	},

	columnButton: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#455A64",
	},
});

export default TaskDetail;
