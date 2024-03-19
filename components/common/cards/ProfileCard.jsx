import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import dice from "@assets/icons/dice.png"
const ProfileCard = ({
	username,
	userTopicSkill,
	imageDisplay,
	description,
	certification,
	handleSwipeLeft,
	handleSwipeRight,
}) => {
	const panGesture = Gesture.Pan();
	return (
		<GestureDetector gesture={panGesture}>
			<View>
				<Image source={dice} contentFit="cover" transition={1000}>
					<View>
						<Text>Hi</Text>
					</View>
				</Image>
			</View>
		</GestureDetector>
	);
};

export default ProfileCard;
