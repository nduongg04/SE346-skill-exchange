import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "@constants";

const Chat = () => {
    
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerTitle: "",
				}}
			/>
            <Text>Chat</Text>
		</SafeAreaView>
	);
};

export default Chat;
