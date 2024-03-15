import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import favicon from "@assets/favicon.png";
import { Image } from "react-native";
import { ScreenHeaderBtn } from "@components/common";

const Home = () => {
	return (
		<SafeAreaView>
			<Text>Hello</Text>
            <Image uri={favicon}/>
		</SafeAreaView>
	);
};

export default Home;
