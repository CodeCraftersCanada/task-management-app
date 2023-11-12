import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Alert,
    Modal
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getTasks } from "../services/homeService";
import { addInvoice } from "../services/billingService";

const BillingCreate = () => {
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [showDropdown, setShowDropdown] = useState(false);
    const [tasks, setTasks] = useState([]);

	const [formData, setFormData] = useState({
	});

	const handleInputChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

    const handleTaskSelect = (selectedTask) => {
		console.log("selected task: ", selectedTask);
		setFormData((prevState) => ({
			...prevState,
			task_id: selectedTask.id, // Assuming task object has an ID
			total_hours: selectedTask.task_hours,
			hourly_rate: selectedTask.assigned.hourly_rate,
			amount: (selectedTask.task_hours * selectedTask.assigned.hourly_rate).toString(),
			paid_to: selectedTask.assigned.id,
			paid_to_name: selectedTask.assigned.name,
			created_by: userInfo.id

		}));
		setShowDropdown(false); // Close the dropdown after selection
	};

	const handleSubmit = () => {
		console.log("handleSubmit ");
		addInvoice(formData, token)
		.then((response) => {
			if (response.data && response.data.status) {
				Alert.alert("Success", response.data.message);
				setFormData({
					task_id: "",
					total_hours: "",
					hourly_rate: "",
					amount: "",
					paid_to: "",
					paid_to_name: "",
					created_by: ""
				});
				navigation.navigate("Billing");
			}
		})
		.catch((error) => {
			console.error("Error adding subtask:", error);
		});
	};

	const navigation = useNavigation();
	console.log("formdata: ", formData);

    useEffect(() => {
		getTasks(token, 0, 0, 0)
			.then((response) => {
				if (response.data && response.data.status) {
					setTasks(response.data.tasks);
				}
			})
			.catch((error) => {
				// Handle error appropriately
			});
	}, [token, 0, 0 , 0]);
    console.log("tasks list: ", tasks);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.settingContainer}>
                    <View style={styles.fieldWrapper}>
                        <View style={styles.settingContainer}>
                            <Ionicons
                                style={styles.fieldIconLeft}
                                name={"mail-outline"}
                                size={24}
                                color={"#8CAAB9"}
                            />
                            <TouchableOpacity
                                style={styles.dropdownHeader}
                                onPress={() => setShowDropdown(!showDropdown)}
                            >
                                <Text style={styles.input}>
                                {formData.task_id ? (
                                    tasks.find((task) => task.id === formData.task_id)?.title ||
                                    "Select Task"
                                ) : (
                                    "Select Task"
                                )}
                                </Text>
                                <Ionicons
                                style={styles.fieldIconRight}
                                name={"create-outline"}
                                size={24}
                                color={"#8CAAB9"}
                                />
                            </TouchableOpacity>
                        </View>
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
                                    key={task.id}
                                    style={styles.dropdownItem}
                                    onPress={() => handleTaskSelect(task)}
                                >
                                    <Text>{task.title}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>
					<View style={styles.fieldWrapper}>
						<Ionicons
							style={styles.fieldIconLeft}
							name={"person-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Paid To"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("paid_to_name", value)}
							value={formData.paid_to_name}
							editable={false}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"hourglass-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Total Hours"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("total_hours", value)}
							value={formData.total_hours}
							editable={false}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"cash-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Hourly Rate"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("hourly_rate", value)}
							value={formData.hourly_rate}
							editable={false}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>

					<View style={styles.fieldWrapper}>
						<Ionicons
							style={[styles.fieldIconLeft, styles.emailIcon]}
							name={"cash-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
						<TextInput
							style={styles.input}
							placeholder="Amount"
							placeholderTextColor="#6F8793"
							onChangeText={(value) => handleInputChange("amount", value)}
							value={formData.amount}
						/>
						<Ionicons
							style={styles.fieldIconRight}
							name={"create-outline"}
							size={24}
							color={"#8CAAB9"}
						/>
					</View>
				</View>
			</View>
			<View style={styles.fixedButtonContainer}>
				<TouchableOpacity style={styles.fixedButton} onPress={handleSubmit}>
					<Text style={styles.fixedButtonText}>Submit</Text>
				</TouchableOpacity>
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
	centeredContent: {
		alignItems: "center",
	},
	imageWrapper: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	imageFrame: {
		borderWidth: 2,
		borderColor: "#FED36A",
		padding: 3,
		borderRadius: 100,
		width: "36.8%",
		alignSelf: "center",
	},
	image: {
		borderRadius: 100,
		width: 127,
		height: 125,
	},
	imageAddWrapper: {
		position: "absolute",
		bottom: 0,
		right: 110,
		backgroundColor: "#212832",
		borderRadius: 50,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	addIconFrame: {
		borderWidth: 2,
		borderColor: "#FFF",
		borderRadius: 5,
	},
	imageMarginBottom: {
		marginBottom: 40,
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
    fieldWrapper: {
        position: "relative",
        marginBottom: 26,
    },
	fieldIconLeft: {
		position: "absolute",
		left: 16,
		top: 12,
		zIndex: 1,
	},
	fieldIconRight: {
		position: "absolute",
		right: 16,
		top: 12,
		zIndex: 1,
	},
	emailIcon: {
		top: 14,
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 10,
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
	logoutIcon: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-end",
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

export default BillingCreate;
