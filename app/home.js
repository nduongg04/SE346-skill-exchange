import { View, Text } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";

import favicon from "@assets/favicon.png";
import { ProfileCard, ScreenHeaderBtn } from "../components";
import { COLORS, icons } from "@constants";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Image } from "expo-image";
import dice from "@assets/icons/dice.png";

const Card = () => gestureHandlerRootHOC(() => <ProfileCard />);

const Home = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: "#FFFFFF" },
					headerShadowVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={favicon}
							dimension="60%"
							string="SkillExchange"
						/>
					),
					headerTitle: "",
				}}
			/>

            <Text>Hi</Text>
			
		</SafeAreaView>
	);
};

export default Home;
