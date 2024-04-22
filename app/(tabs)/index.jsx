import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { ProfileCard, Topic } from "../../components";
import Suzy from "@assets/icons/Suzy.png";
export default function Index() {
	return (
		// <Redirect
		// 	href={{
		// 		pathname: "/user/[id]",
		// 		params: {
		// 			id: "660ebd05e2ac91975b2ad0cd",
		// 		},
		// 	}}
		// />
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
}
