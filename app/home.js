import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../components";
import { COLORS, icons } from "@constants";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { CircleButton } from "@components";
import NavBar from "@components/NavBar";
import { Dimensions } from "react-native";
import Suzy from "@assets/icons/Suzy.png";

// const Card = () => gestureHandlerRootHOC(() => <ProfileCard />);

const Home = () => {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const handleSwipeLeft = () => {
		console.log("swiped left");
	};

	const handleSwipeRight = () => {
		console.log("swiped right");
	};

	const backButtonSize = (screenWidth / 100) * 18;

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={favicon}
							dimension={40}
							string="SkillExchange"
						/>
					),
					headerTitle: "",
				}}
			/>
			<View style={{ height: "100%", width: "100%",  justifyContent: "flex-end"}}>
				<View style={{ margin: 5,marginBottom: 0, height: "75%" }}>
					<ProfileCard
						username={"Bae Suzy"}
						userTopicSkill={[
							"Coding",
							"English",
							"React Native",
							"Hello",
							"Hello",
							"Hello",
						]}
						imageDisplay={Suzy}
						description={`I’m an actress. I have participated in several K-dramas: "Dream High," Suzy starred in several popular K-dramas, including "Gu Family Book" (2013), "Uncontrollably Fond" (2016), and "Vagabond" (2019).`}
						handleSwipeLeft={handleSwipeLeft}
						handleSwipeRight={handleSwipeRight}
					/>
				</View>

				<View
					style={{
                        height: "15%",
						flexDirection: "row",
						justifyContent: "center",
                        alignItems: "center",
						gap: (screenWidth / 100) * 7,
					}}
				>
					<CircleButton
						iconUrl={icons.backLoading}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
					/>
					<CircleButton
						iconUrl={icons.cancel}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
						style={{ flex: 1 }}
					/>

					<CircleButton
						iconUrl={icons.tickCircle}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
					/>
				</View>

				<View style={{ height: "10%" }}>
					<NavBar />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
