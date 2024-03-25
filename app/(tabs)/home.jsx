import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../../components";
import { COLORS, icons } from "@constants";
import { CircleButton } from "@components";
import { Dimensions } from "react-native";
import Suzy from "@assets/icons/Suzy.png";
import { useState } from "react";
const Home = () => {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const handleSwipeLeft = () => {
		console.log("swiped left");
	};

	const handleSwipeRight = () => {
		console.log("swiped right");
	};

	const [backButtonSize, setBackButtonSize] = useState(
		(screenWidth / 100) * 18
	);
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: COLORS.lightWhite, width: "100%" }}
		>
			<Stack.Screen
				options={{
					title: "Home",
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => (
						<View style={{ marginLeft: 10 }}>
							<ScreenHeaderBtn
								iconUrl={favicon}
								dimension={40}
								string="SkillExchange"
								style={{ marginLeft: 10 }}
							/>
						</View>
					),
					headerTitle: "",
				}}
			/>
			<View style={{ height: "100%", width: "100%" }}>
				<View style={{ marginTop: 10, height: "80%" }}>
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
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: (screenWidth / 100) * 7,
					}}
				>
					<CircleButton
						iconUrl={icons.cancel}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
						style={{ flex: 1 }}
					/>

					<CircleButton
						iconUrl={icons.backLoading}
						width={backButtonSize - 13}
						height={backButtonSize - 13}
						handlePress={() => {}}
					/>

					<CircleButton
						iconUrl={icons.tickCircle}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
