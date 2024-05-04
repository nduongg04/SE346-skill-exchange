import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "../../components";
import { COLORS, icons } from "@constants";
import { CircleButton } from "@components";
import { Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetData from "../../utils/getdata";
import useLoadingHome from "../../utils/useLoadingHome";
import useUserStore from "../../utils/usersStore";
import { useSession } from "../../context/AuthContext";

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const Home = () => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const [backButtonSize, setBackButtonSize] = useState(
		(screenWidth / 100) * 18
	);
	let previousCardIndex = 0;

	const { user } = useSession();

	const isLoading = useLoadingHome((state) => state.loading);
	const setIsLoading = useLoadingHome((state) => state.setLoading);

	const users = useUserStore((state) => state.users);
	const setUsers = useUserStore((state) => state.setUsers);

	const swiperRef = useRef(null);

	const handleSwipeRight = () => {
		console.log("swiped right");
	};

	const handleSwipe = (index) => {};

	useEffect(() => {
		const obj = {
			access_token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY2NzE5MGY5MTA2ZTk0ZDJhN2E5YzAiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzE0MTQyNzA2LCJleHAiOjE3MTQxNDYzMDZ9.W0I3ubbo9bSwE7icWJRqcpn9YFPS3RD_Iqu-z8RMQr0",
			refresh_token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY2NzE5MGY5MTA2ZTk0ZDJhN2E5YzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxNDA2NzU1OSwiZXhwIjoxNzE2NjU5NTU5fQ.WCgSogFxxaqfpRD99ve_e-N5FbQXMgmUADP3xZef_pE",
		};
		const getUsers = async () => {
			setIsLoading(true);
			AsyncStorage.setItem("accessToken", obj.access_token);
			AsyncStorage.setItem("refreshToken", obj.refresh_token);
			const url = `${baseUrl}/api/v1/user/find`;
			const data = await GetData(url);
			setUsers(shuffleArray(data));
			if (users) {
				setIsLoading(false);
			} else {
				setIsLoading(true);
			}
		};
		if (!user || users.length === 0) {
			console.log("get users");
			getUsers();
		}
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={COLORS.darkOrange} />
			</View>
		);
	}

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
				<View
					style={{
						marginTop: 10,
						height: "80%",
						width: "100%",
					}}
				>
					<Swiper
						ref={swiperRef}
						cardStyle={{
							height: "100%",
							width: "100%",
						}}
						onSwipedLeft={(cardIndex) => {
							previousCardIndex = cardIndex;
						}}
						cardHorizontalMargin={0}
						backgroundColor="white"
						swipeBackCard
						renderCard={(user, index) => {
							return (
								<ProfileCard
									id={user?.id}
									username={user?.username}
									skill={user?.skill}
									birthDay={user?.birthDay}
									userTopicSkill={user?.userTopicSkill}
									imageDisplay={user?.avatar}
									imageCerti={user?.imageCerti}
									description={user?.description}
									key={index}
								/>
							);
						}}
						onSwiped={handleSwipe}
						onSwipedRight={handleSwipeRight}
						cards={users}
						cardVerticalMargin={0}
						onSwipedAll={this.onSwipedAllCards}
						showSecondCard={true}
						stackSize={3}
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
						handlePress={() => swiperRef.current.swipeLeft()}
						style={{ flex: 1 }}
					/>

					<CircleButton
						iconUrl={icons.backLoading}
						width={backButtonSize - 13}
						height={backButtonSize - 13}
						handlePress={() => {
							swiperRef.current.jumpToCardIndex(previousCardIndex);
						}}
					/>

					<CircleButton
						iconUrl={icons.tickCircle}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {
							swiperRef.current.swipeRight();
						}}
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
