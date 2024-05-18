import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	items,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@constants";

import favicon from "@assets/favicon.svg";
import Background from "@assets/icons/Background.png";
import Ellipse from "@assets/icons/Ellipse 1.png";
import EditProfile from "@assets/icons/Edit profile.png";
import ProfileButton from "@assets/icons/ProfileButton.png";
import LogOut from "@assets/icons/LogOut.png";
import BaeSuzy from "@assets/icons/Suzy.png";

const Profile = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.darkGrayProfile,
                width: "100%"
			}}
		>
            <Stack.Screen
				options={{
					title: "Profile",
					headerShown: false,
				}}
			/>
			<ImageBackground
				source={Background}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<ScrollView showsVerticalScrollIndicator={false}
                style={{width: "100%", padding: 20}}>

					<View style={styles.profileContainer}>
						<View style={styles.headerContainer}>
							<Text style={styles.headerText}>Personal</Text>
						</View>
						<View style={styles.imgContainer}>
							<Image source={Ellipse} style={styles.avatarImage} />
							<TouchableOpacity style={{ alignItems: "flex-end", top: -115 }}>
								<Image source={EditProfile} />
							</TouchableOpacity>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.usernameText}>Bae Suzy</Text>
						</View>
					</View>
					<View style={styles.informationContainer}>
						<Text style={styles.headerInformation}>General Information</Text>
						<View style={styles.items}>
							<View>
								<Text>Phone Number</Text>
							</View>
							<Text>0xxx xxx xxx</Text>
						</View>
						<View style={styles.items}>
							<View>
								<Text>Password</Text>
							</View>
							<TouchableOpacity>
								<Text style={{ color: "blue" }}>Change Password</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.items}>
							<View>
								<Text>Birthday</Text>
							</View>
							<Text>11/08/2004</Text>
						</View>
						<View style={styles.items}>
							<View>
								<Text>Email</Text>
							</View>
							<Text>abc123@gmail.com</Text>
						</View>

						<View style={styles.rectangle}>
							<ImageBackground
								source={ProfileButton}
								style={{ flex: 1 }}
								imageStyle={{ borderRadius: 10 }}
							>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
									<View
										style={{
											height: "100%",
											width: "100%",
											justifyContent: "center",
											marginLeft: 20,
										}}
									>
										<Text>Skills that I know</Text>
									</View>
								</TouchableOpacity>
							</ImageBackground>

							<ImageBackground
								source={ProfileButton}
								style={{ flex: 1, marginTop: 15 }}
								imageStyle={{ borderRadius: 10 }}
							>
								<TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
									<View
										style={{
											height: "100%",
											width: "100%",
											justifyContent: "center",
											marginLeft: 20,
										}}
									>
										<Text>Skills that I learn</Text>
									</View>
								</TouchableOpacity>
							</ImageBackground>

							<ImageBackground
								source={ProfileButton}
								style={{ flex: 1, marginTop: 15 }}
								imageStyle={{ borderRadius: 10 }}
							>
								<TouchableOpacity>
									<View
										style={{
											height: "100%",
											width: "100%",
											justifyContent: "center",
											marginLeft: 20,
										}}
									>
										<Text>My certifications</Text>
									</View>
								</TouchableOpacity>
							</ImageBackground>
                            
						</View>
					</View>
				</ScrollView>
			</ImageBackground>

			
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "40%",
	},
	profileContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		marginTop: 50,
		marginBottom: -70,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 25,
	},

	informationContainer: {
		width: "100%",
	},
	avatarImage: {
		width: 120,
		height: 120,
		marginTop: 100,

		flex: 1,
		resizeMode: "contain",
	},
	textContainer: {
		alignItems: "center",
		marginBottom: 0,
		marginTop: -30,
	},
	usernameText: {
		fontSize: 18,
	},
	headerInformation: {
		fontSize: 24,
		fontWeight: "bold",
		marginRight: 100,
		marginTop: 15,
	},
	items: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		marginBottom: 10,
		marginTop: 5,
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},
	rectangle: {
		width: 350,
		height: 400,
		padding: 20,
		backgroundColor: "#FFFFFF",
		marginTop: 10,
		borderRadius: 10,
	},
});

export default Profile;
