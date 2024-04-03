import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View, Text, ImageBackground } from "react-native";
import { COLORS } from "@constants";
import { icons } from "@constants";
import Topic from "@components/common/cards/Topic";
import { Image } from "expo-image";

const ProfileCard = ({
	username,
	userTopicSkill,
	imageDisplay,
	description,
	handleSwipeLeft,
	handleSwipeRight,
}) => {
	const panGesture = Gesture.Pan();
	return (
		<View
			style={{
				borderRadius: 10,
				overflow: "hidden",

				shadowColor: COLORS.shadowBlue,
				shadowOffset: {
					width: 0,
					height: 5,
				},
				shadowOpacity: 0.34,
				shadowRadius: 6.27,

				elevation: 10,
			}}
		>
			<ImageBackground
				source={imageDisplay}
				contentFit="cover"
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					overflow: "hidden",
                    
				}}
				transition={1000}
			>
				<View style={{height: "50%"}}/>
				<ImageBackground
					source={icons.transparent_background}
					resizeMode="stretch"
					style={{ flex: 1 }}
				>
					<View
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							padding: 17,
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								gap: 7,
								width: "100%",
								flexWrap: "wrap",
							}}
						>
							<Text
								style={{
									color: COLORS.lightWhite,
									fontFamily: "NotoRegular",
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								{username}
							</Text>

							{userTopicSkill.map((topic, index) => (
								<Topic topicContent={topic} key={index} />
							))}
						</View>

						<View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
                                    marginTop: 4,
								}}
							>
								<Image
									source={icons.location}
									contentFit="cover"
									style={{ width: 25, height: 25, marginLeft: -3 }}
								/>

								<Text style={{ fontFamily: "NotoRegular", fontSize: 14, color: COLORS.lightWhite }}>
									80km
								</Text>
							</View>

							<View>
								<Text style={{ fontFamily: "NotoExtraBold", fontSize: 13, color: COLORS.lightWhite, marginBottom: 5}}>
									Description:
								</Text>

								<Text style={{ fontFamily: "NotoRegular", fontSize: 14, lineHeight: 21, color: COLORS.lightWhite  }}>
									{description}
								</Text>
							</View>

						</View>
					</View>
				</ImageBackground>
			</ImageBackground>
		</View>
	);
};

export default ProfileCard;
