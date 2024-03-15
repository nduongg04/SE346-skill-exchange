import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import favicon from "@assets/favicon.png";
import { Image } from "react-native";
import { ScreenHeaderBtn } from "@components/common";
import { StatusBar } from "expo-status-bar";

const Home = () => {
	return (
		<View className="flex-1 items-center justify-center bg-blue-500">
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
};

export default Home;
