import React, { useState } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const users = [
	{
		id: 1,
		name: "Kate",
		email: "mrskate@gmail.com",
		image: "../assets/img/logo.png",
	},
	{
		id: 1,
		name: "John",
		email: "doe@gmail.com",
		image: "../assets/img/logo.png",
	},
];

const AutoCompleteDropdown = () => {
	const [query, setQuery] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	const findUser = (query) => {
		if (query) {
			const regex = new RegExp(`${query.trim()}`, "i");
			setFilteredUsers(
				users.filter(
					(user) =>
						user.name.search(regex) >= 0 || user.email.search(regex) >= 0
				)
			);
		} else {
			// If the query is empty, reset the filtered users to an empty array
			setFilteredUsers([]);
		}
	};

	const showAllUsers = () => {
		setFilteredUsers(users);
		console.log("filteredUsers ", filteredUsers);
		setQuery(" "); // Clear the current query
	};

	const handleSelectItem = (item) => {
		setQuery(item.name);
		setFilteredUsers([]);
		console.log(item, " tesr ");
		console.log(item, " query ", query);
	};

	const renderUserItem = ({ item }) => (
		<TouchableOpacity onPress={() => handleSelectItem(item)}>
			<View style={styles.userItem}>
				<Image
					source={require("../assets/img/logo.png")}
					style={styles.userImage}
				/>
				<Text style={styles.userName}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View>
			<View style={styles.row}>
				<View style={styles.columnAutoComplete}>
					<Autocomplete
						value={query}
						key={filteredUsers.length}
						editable={true}
						autoCapitalize="none"
						autoCorrect={false}
						data={filteredUsers}
						defaultValue={query}
						onChangeText={(text) => {
							setQuery(text);
							findUser(text);
						}}
						placeholder="Enter the user name"
						renderItem={renderUserItem}
						keyExtractor={(item, index) => item.id.toString()}
						flatListProps={{
							keyExtractor: (item) => item.id.toString(),
							renderItem: renderUserItem,
						}}
						containerStyle={styles.autocomplete_container}
						inputContainerStyle={styles.autocomplete_input}
						listContainerStyle={styles.autocomplete_list_container}
						listStyle={styles.autocomplete_list}
					/>
				</View>
				<View style={styles.columnIcon}>
					<TouchableOpacity onPress={showAllUsers}>
						<View>
							<Ionicons name={"add"} size={28} color={"#263238"} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		...Platform.select({
			android: {
				marginTop: 25,
			},
			default: {
				marginTop: 0,
			},
		}),
	},
	userItem: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
	},
	userImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	userName: {
		fontSize: 18,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	columnIcon: {
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#FED36A",
		color: "white",
		height: 50,
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
	autocomplete_container: {
		width: "100%",
		height: 50,
		backgroundColor: "white",
	},
	autocomplete_input: {
		borderWidth: 0,
		backgroundColor: "#455A64",
	},
	autocomplete_list_container: {
		borderWidth: 0,
	},
	autocomplete_list: {
		width: "100%",
		maxHeight: 250,
		margin: 0,
		padding: 5,
		zIndex: 3,
		borderColor: "black",
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		backgroundColor: "#455A64",
	},
});

export default AutoCompleteDropdown;
