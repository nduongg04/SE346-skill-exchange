import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";

import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../components";
import { COLORS, icons } from "@constants";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { CircleButton } from "@components";

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

			<CircleButton iconUrl={icons.backLoading} width={60} height={60} />
		</SafeAreaView>
	);
};

export default Home;
