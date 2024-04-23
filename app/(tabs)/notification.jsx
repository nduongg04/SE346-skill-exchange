import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
("../../components");
import { COLORS, icons } from "@constants";

const Notification = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerTitle: "",
				}}
			/>
			<Text>Notification</Text>
		</SafeAreaView>
	);
};

export default Notification;
