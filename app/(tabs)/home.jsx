import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../../components";
import { COLORS, icons } from "@constants";
import { CircleButton } from "@components";
import { Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Suzy from "@assets/icons/Suzy.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const handleSwipeLeft = () => {
		console.log("swiped left");
	};

	const handleSwipeRight = () => {
		console.log("swiped right");
	};

	useEffect(() => {
		const baseUrl = "https://se346-skillexchangebe.onrender.com";

		const getNewAccessToken = async () => {
			const refreshToken = await AsyncStorage.getItem("refreshToken");
			try {
				const response = await axios.get(baseUrl + "/api/v1/auth/refresh", {
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				});
				const newAccessToken = response.data.access_oken;
				returm(newAccessToken);
			} catch (error) {
				console.error(error);
			}
		};
	}, []);

	const cards = [];

	const [backButtonSize, setBackButtonSize] = useState(
		(screenWidth / 100) * 18
	);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.lightWhite,
				width: "100%",
			}}
		>
			<Stack.Screen
				options={{
					title: "Home",
					headerShown: false,
					headerTitle: "",
				}}
			/>
			<View style={{ marginLeft: 15, zIndex: -1 }}>
				<ScreenHeaderBtn
					iconUrl={favicon}
					dimension={40}
					string="SkillExchange"
					style={{ marginLeft: 10 }}
				/>
			</View>

			<View style={{ height: "95%", width: "100%" }}>
				<View style={{ marginTop: 10, height: "80%" }}>
					<Swiper
						cardStyle={{ height: "100%", width: "100%" }}
						cardHorizontalMargin={0}
						backgroundColor="white"
						renderCard={(card) => {
							return (
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
								/>
							);
						}}
						// onSwiped={() => this.onSwiped("general")}
						// onSwipedLeft={() => this.onSwiped("left")}
						// onSwipedRight={() => this.onSwiped("right")}
						// onSwipedTop={() => this.onSwiped("top")}
						// onSwipedBottom={() => this.onSwiped("bottom")}
						// onTapCard={this.swipeLeft}
						cards={cards}
						// cardIndex={this.state.cardIndex}
						cardVerticalMargin={0}
						onSwipedAll={this.onSwipedAllCards}
						showSecondCard={true}
						stackSize={2}
						disableTopSwipe={true}
						disableBottomSwipe={true}
						stackSeparation={5}
						overlayLabels={{
							left: {
								title: "NOPE",
								style: {
									label: {
										backgroundColor: "#FF6767",
										borderColor: "#FF6767",
										color: "white",
										borderWidth: 1,
									},
									wrapper: {
										flexDirection: "column",
										alignItems: "flex-end",
										justifyContent: "flex-start",
										marginTop: 30,
										marginLeft: -30,
									},
								},
							},
							right: {
								title: "MATCH",
								style: {
									label: {
										backgroundColor: "#4ECB71",
										borderColor: "#4ECB71",
										color: "white",
										borderWidth: 1,
									},
									wrapper: {
										flexDirection: "column",
										alignItems: "flex-start",
										justifyContent: "flex-start",
										marginTop: 30,
										marginLeft: 30,
									},
								},
							},
						}}
						animateOverlayLabelsOpacity
						animateCardOpacity
						swipeBackCard
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "#F5FCFF",
	},
	card: {
		width: "100%",
		height: "100%",
		flex: 1,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#E8E8E8",
		justifyContent: "center",
		backgroundColor: "white",
	},
	text: {
		textAlign: "center",
		fontSize: 50,
		backgroundColor: "transparent",
	},
	done: {
		textAlign: "center",
		fontSize: 30,
		color: "white",
		backgroundColor: "transparent",
	},
});

export default Home;
