import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import {  ScreenHeaderBtn } from "../../components";
import { COLORS } from "@constants";
const Profile = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					title: "Profile",
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerTitle: "",
				}}
			/>
            <Text>Profile</Text>
		</SafeAreaView>
	);
};

export default Profile;
