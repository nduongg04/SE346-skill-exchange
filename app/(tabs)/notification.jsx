import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../../components";
import { COLORS, icons } from "@constants";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { CircleButton } from "@components";
import { Dimensions } from "react-native";
import Suzy from "@assets/icons/Suzy.png";

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
