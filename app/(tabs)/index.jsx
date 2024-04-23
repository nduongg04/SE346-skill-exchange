import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { ProfileCard, Topic } from "../../components";
import Suzy from "@assets/icons/Suzy.png";
export default function Index() {
	//return <Redirect href="/home"  />;
	return <Redirect href="/signing/Signing"  />;
}
