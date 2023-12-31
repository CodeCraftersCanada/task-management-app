import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Image,
	Alert,
	Modal,
} from "react-native";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAllTasks } from "../services/homeService";
import { getMembers } from "../services/userService";
import { useNavigation } from "@react-navigation/native";
import images from "../utils/imageAssets";
import { addTask } from "../services/taskDetailService";

const TaskCreate = () => {
	const navigation = useNavigation();
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [selectedMemberId, setSelectedMemberId] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		start_date: "",
		end_date: "",
		assigned_to: "",
		created_by: userInfo._id,
		task_status_id: 2,
		task_hours: 0,
		parent_id: null,
		parent_task_name: "",
	});
	const [members, setMembers] = useState([]);

	const fetchMembers = async () => {
		getMembers(token)
			.then((response) => {
				if (response.data && response.data.status) {
					setMembers(response.data.users);
				}
			})
			.catch((error) => {});
	};
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchMembers();
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		getAllTasks(token, 1, userInfo._id)
			.then((response) => {
				if (response.data && response.data.status) {
					setTasks(response.data.tasks);
				}
			})
			.catch((error) => {
				// Handle error appropriately
			});
	}, [token, 0, 0, 0]);

	const handleInputChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleMemberSelect = (memberId) => {
		setFormData((prevState) => ({
			...prevState,
			assigned_to: memberId,
		}));
		setSelectedMemberId(memberId);
	};

	const handleSave = () => {
		addTask(formData, token)
			.then((response) => {
				if (response.data && response.data.status) {
					Alert.alert("Success", response.data.message);
					setFormData({
						title: "",
						description: "",
						start_date: "",
						end_date: "",
						assigned_to: "",
						created_by: userInfo.id,
						task_status_id: 2,
					});
					navigation.navigate("Home");
				}
			})
			.catch((error) => {
				console.error("Error adding subtask:", error);
			});
	};

	const isSelected = (memberId) => {
		return memberId === selectedMemberId;
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

	const handleTaskSelect = (selectedTask) => {
		setFormData((prevState) => ({
			...prevState,
			parent_id: selectedTask._id,
			parent_task_name: selectedTask.title,
		}));
		setShowDropdown(false);
	};

	function formatDate(date) {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();

		return `${month}/${day}/${year}`;
	}

	return (
		<SafeAreaView style={styles.safeView}>
			<View style={styles.container}>
				<Text style={styles.fieldLabel}>Task Title</Text>
				<TextInput
					style={styles.input}
					placeholderTextColor="#6F8793"
					onChangeText={(value) => handleInputChange("title", value)}
					value={formData.title}
				/>
				<Text style={styles.fieldLabel}>Task Details</Text>
				<TextInput
					multiline
					style={[styles.input, styles.textArea]}
					onChangeText={(value) => handleInputChange("description", value)}
					value={formData.description}
				/>
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
											formData.start_date === ""
												? "MM/DD/YY"
												: formData.start_date
										}
										style={styles.dateButton}
										onPress={() => showDatePicker("start")}
										color={Platform.select({
											ios: "white",
											android: "#455A64",
										})}
									/>
								</TouchableOpacity>
								<DateTimePickerModal
									isVisible={isStartDatePickerVisible}
									mode="date"
									minimumDate={new Date()}
									onConfirm={(date) => handleConfirm(date, "start_date")}
									onCancel={hideDatePicker}
									display="inline"
									textColor="#455A64"
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
											formData.end_date === "" ? "MM/DD/YY" : formData.end_date
										}
										style={styles.dateButton}
										onPress={() => showDatePicker("end")}
										color={Platform.select({
											ios: "white",
											android: "#455A64",
										})}
									/>
								</TouchableOpacity>
								<DateTimePickerModal
									isVisible={isEndDatePickerVisible}
									mode="date"
									minimumDate={new Date()}
									onConfirm={(date) => handleConfirm(date, "end_date")}
									onCancel={hideDatePicker}
									display="inline"
									textColor="#455A64"
								/>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.row}>
					<Text style={styles.fieldLabel}>Linked Task</Text>
					<View>
						<TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
							<Ionicons name={"link-outline"} size={28} color={"yellow"} />
						</TouchableOpacity>
					</View>
					<Modal
						visible={showDropdown}
						animationType="slide"
						transparent={true}
						onRequestClose={() => setShowDropdown(false)}
					>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								{tasks.map((task) => (
									<TouchableOpacity
										key={task._id}
										style={styles.dropdownItem}
										onPress={() => handleTaskSelect(task)}
									>
										<Text>{task.title}</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					</Modal>
				</View>
				<TextInput
					style={styles.input}
					placeholderTextColor="#6F8793"
					value={formData.parent_task_name}
				/>
				<Text style={styles.fieldLabel}>Assign Team Member</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollViewContainer}
				>
					{members.map((member, index) => (
						<TouchableOpacity
							key={member._id}
							onPress={() => handleMemberSelect(member._id)}
						>
							<Image
								style={[
									styles.image,
									isSelected(member._id) && styles.selectedImage,
								]}
								source={images[member.filename]}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>

				<TouchableOpacity onPress={handleSave}>
					<View style={styles.fixedButtonContainer}>
						<View style={styles.fixedButton}>
							<Text style={styles.fixedButtonText}>SAVE</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	safeView: {
		position: "relative",
	},
	container: {
		marginTop: 20,
		width: "100%",
		height: "100%",
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
	dateButtonContainer: {
		backgroundColor: "#455A64",
		width: "100%",
		...(Platform.OS === "android"
			? {
					color: "#455A64",
			  }
			: {
					color: "white",
			  }),
	},
	dateButton: {
		...(Platform.OS === "android"
			? {
					color: "#455A64",
			  }
			: {
					color: "white",
			  }),
		backgroundColor: "#455A64",

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
		marginTop: 0,
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

	columnIcon: {
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#FED36A",
		color: "white",
	},

	columnAutoComplete: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#455A64",
		color: "white",
		height: 50,
	},
	image: {
		borderRadius: 50,
		width: 50,
		height: 50,
		marginRight: 10,
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 50,
		left: 5,
		right: 5,
	},
	fixedButton: {
		backgroundColor: "#FED36A",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	fixedButtonText: {
		color: "#000",
		fontSize: 18,
		fontWeight: "600",
	},
	selectedImage: {
		borderColor: "#FED36A",
		borderWidth: 2,
	},
	textArea: {
		height: 80,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
	},
	dropdownItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
});

export default TaskCreate;
