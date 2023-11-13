import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TextInput,
	Image,
	TouchableOpacity,
	FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getInvoices } from "../services/billingService";
import images from "../utils/imageAssets";


const Billing = () => {
	const [search, setSearch] = useState("");
	const userInfo = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [invoiceList, setInvoiceList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const navigation = useNavigation();

	useFocusEffect(
		React.useCallback(() => {
			const fetchInvoices = async () => {
				try {
					const invoicesData = await getInvoices(token);
					if (invoicesData.data && invoicesData.data.status) {
						setInvoiceList(invoicesData.data.invoices);
						setFilteredList(invoicesData.data.invoices);
					}
				} catch (error) {
					console.log("Error fetching invoices list: ", error);
					// You can handle errors by setting some state and showing it in the UI if needed
				}
			};
			fetchInvoices();
		}, [token]) // Fetch on every focus change and token change
	);

	console.log("Invoices List: ", invoiceList);

	const Item = ({ item }) => (
		<TouchableOpacity onPress={() => navigation.navigate("Billing Detail", { item })}>
			<View style={[styles.row, styles.card]}>
				<View style={styles.columnLeft}>
					<Text style={styles.nameLabel}>{item.task.title}</Text>
					<Text style={styles.hourLabel}>{item.total_hours}</Text>
				</View>
				<View style={styles.columnRight}>
					<Text style={styles.dollarLabel}>${item.amount}</Text>
				</View>
				<View style={styles.columnEnd}>
					<Image
						style={styles.image}
						source={images[item.payee.filename]}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => <Item item={item} />;

	const handleSearchChange = (searchStr) => {
		setSearch(searchStr);
		console.log("search text: ", searchStr);
		const searched = searchStr.toLowerCase();

		if (!searched || searched == "") {
			setFilteredList(invoiceList);
		} else {
			const newData = invoiceList.filter((item) => {
				return item.task.title.toLowerCase().search(searched) > -1;
			});
			console.log(newData);
			setFilteredList(newData);
		}
	};

	const handlePress = () => {
		navigation.navigate("Billing Detail");
	};

	const handleAdd = () => {
		navigation.navigate("Billing Create");
	};

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
										onChangeText={(value) => handleSearchChange(value)}
										value={search}
									/>
								</View>
							</View>
							<View style={styles.filterColumn}>
								<Ionicons name={"filter-outline"} size={24} color={"#6F8793"} />
							</View>
						</View>

						<View>
							<FlatList
								data={filteredList}
								renderItem={renderItem}
								keyExtractor={(item) => item.id}
								contentContainerStyle={{ paddingBottom: 20 }}
							/>
						</View>

						{userInfo.user_type_id === 1 && (
							<TouchableOpacity style={styles.addButton} onPress={handleAdd}>
								<View style={styles.addIcon}>
									<Ionicons name="add" size={24} color="#000" />
								</View>
							</TouchableOpacity>
						)}
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
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	card: {
		backgroundColor: "#263238",
		padding: 20,
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
	columnLeft: {
		width: "50%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	columnRight: {
		width: "30%",
		justifyContent: "center",
		alignItems: "center",
	},
	columnEnd: {
		width: "20%",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	image: {
		width: 47,
		height: 47,
		borderRadius: 100,
	},
	nameLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	hourLabel: {
		fontSize: 14,
		fontWeight: "200",
		color: "#D2D2D2",
	},
	dollarLabel: {
		fontSize: 16,
		fontWeight: "400",
		color: "#D2D2D2",
	},
	addButton: {
		position: 'absolute',
		bottom: 20,
		left: '50%',
		transform: [{ translateX: -30 }],
		backgroundColor: '#FED36A',
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		width: 60,
		height: 60,
		zIndex: 1,
	  },
	  addIcon: {
		justifyContent: 'center',
		alignItems: 'center',
	  },
});

export default Billing;
