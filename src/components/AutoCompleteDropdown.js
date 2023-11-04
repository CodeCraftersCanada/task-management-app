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
		setQuery(""); // Clear the current query
	};

	const renderUserItem = ({ item }) => (
		<TouchableOpacity onPress={() => setQuery(item.name)}>
			<View style={styles.userItem}>
				<Image source={{ uri: item.image }} style={styles.userImage} />
				<Text style={styles.userName}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View>
			<View style={styles.row}>
				<View style={styles.columnAutoComplete}>
					<Autocomplete
						editable={true}
						autoCapitalize="none"
						autoCorrect={false}
						data={query.length === 0 ? [] : filteredUsers}
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
						style={styles.autocomplete}
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
		color: " white",
	},

	columnAutoComplete: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#455A64",
		color: "white",
	},
	autocomplete: {
		width: "100%",
		backgroundColor: "#455A64",
		borderWidth: 0,
		borderColor: "#455A64",
		color: "white",
	},
});

export default AutoCompleteDropdown;
