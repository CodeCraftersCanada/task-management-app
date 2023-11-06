import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as Progress from "react-native-progress";

const CardInprogress = () => {
	return (
		<View style={[styles.cardContainer]}>
			<Text style={[styles.cardLargeText, styles.colorWhite]}>
				Mobile App Wireframe
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
							source={require("../assets/img/dummy.png")}
						/>
					</View>
					<View style={styles.row}>
						<Text style={[styles.cardSmallText, styles.colorWhite]}>
							Due on : 21 November
						</Text>
					</View>
					<View style={styles.row}>
						<Text style={[styles.cardSmallText, styles.colorWhite]}>
							Total Hours : 04:30:00
						</Text>
					</View>
					<View style={styles.row}>
						<Text style={[styles.cardSmallText, styles.colorWhite]}>
							Total Cost : $40.00
						</Text>
					</View>
				</View>
				<View style={[styles.columnRight]}>
					<Progress.Circle
						size={90}
						progress={0.75}
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
		</View>
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
