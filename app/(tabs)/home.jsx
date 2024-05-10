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
import { useSession } from "../../context/AuthContext";
import SwiperList from "../../components/common/swiper/Swiper";

const Home = () => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const [backButtonSize, setBackButtonSize] = useState(
		(screenWidth / 100) * 18
	);
	let previousCardIndex = 0;
	// const { user } = useSession();
	const user = {
		_id: "6637113c92bdb2d7e5c22ffa",
		username: "Nguyen Thu",
		email: "thu@gmail.com",
		phoneNumber: "0987654321",
		avatar:
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Ffree-images.jpg?alt=media&token=04ccc7aa-f5e6-4ad6-afc3-5a05be7707d6",
		imageCerti: [
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Fcertified.jpg?alt=media&token=42ba5bda-3129-4d80-9e34-4df101f955ed",
		],
		description: ["I'm an engineer"],
		userTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258cc",
				name: "Electronics",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FElectronics.png?alt=media&token=249f9898-c5d1-4d62-8b5d-320dbc7e6e4a",
				__v: 0,
				id: "66168dbd7c0f4757e77258cc",
			},
			{
				_id: "66168dbd7c0f4757e77258ce",
				name: "Leadership Skills",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FLeadership%20Skills.png?alt=media&token=c9141fb4-756b-4a2d-96e4-3a9d736392d7",
				__v: 0,
				id: "66168dbd7c0f4757e77258ce",
			},
			{
				_id: "66168dbd7c0f4757e77258d4",
				name: "Coding",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCoding.png?alt=media&token=2b9d5877-6edf-4bc6-b0ba-a35f6e5eb2e8",
				__v: 0,
				id: "66168dbd7c0f4757e77258d4",
			},
		],
		learnTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258dc",
				name: "Coding",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FManagement%20Skills.png?alt=media&token=b52e7a57-3f02-4045-927b-71d44ae3e249",
				__v: 0,
				id: "66168dbd7c0f4757e77258dc",
			},
		],
		skill: ["English"],
		birthDay: "2004-08-11T00:00:00.000Z",
		rankElo: 0,
		__v: 0,
		id: "6637113c92bdb2d7e5c22ffa",
	};

	const [users, setUsers] = useState([]);
	const isLoading = useLoadingHome((state) => state.loading);
	const setIsLoading = useLoadingHome((state) => state.setLoading);
	const swiperRef = useRef(null);

	const getTopicUrl = () => {
		let topicUrl = `${baseUrl}/api/v1/user/find/topic?topics=`;
		user?.learnTopicSkill.map((topic, index) => {
			if (index !== user.length - 1) topicUrl = `${topicUrl}${topic.name}`;
			else topicUrl = `${topicUrl}${topic.name},`;
		});
		return topicUrl;
	};

	useEffect(() => {
		// const obj = {
		// 	accessToken:
		// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM3MTEzYzkyYmRiMmQ3ZTVjMjJmZmEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzE0ODg0OTI1LCJleHAiOjE3MTQ4ODg1MjV9.XwKNWrF2_18fHkf3MM5TAMReHAiiPSPEIKARS1tChZQ",
		// 	refreshToken:
		// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM3MTEzYzkyYmRiMmQ3ZTVjMjJmZmEiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxNDg4NDkyNSwiZXhwIjoxNzE3NDc2OTI1fQ.foDOgd6lygNV9eNUoZKgvF6Fn0GxPEYUq14dzvX5Dqk",
		// };
		const getUsers = async () => {
			setIsLoading(true);
			// AsyncStorage.setItem("accessToken", obj.accessToken);
			// AsyncStorage.setItem("refreshToken", obj.refreshToken);
			const url = getTopicUrl();
			const data = await GetData(url);
			setUsers(data);
			if (users) {
				setIsLoading(false);
			} else {
				setIsLoading(true);
			}
		};
		getUsers();
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
				<View style={{ marginTop: 10, height: "80%" }}>
					<SwiperList
                        users={users}
                        swiperRef={swiperRef}
                        onSwiped={(index) => {
                            previousCardIndex = index;
                        }}
                        onSwipedAll={() => {
                            console.log("Swiped all");
                        }}
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
