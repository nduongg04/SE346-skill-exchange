import { useEffect, useState } from "react";
import Information from "../../components/home/Information";
import { useLocalSearchParams } from "expo-router";
import GetData from "../../utils/getdata";
import { View, Text } from "react-native";
const User = () => {
	const props = {
	    username: "Suzy",
	    skill: ["Actress", "Singer"],
	    birthDay: "11/08/2004",
	    userTopicSkill: ["Actress", "Singer"],
	    avatar: require("../../assets/icons/Suzy.png"),
	    imageCerti: [
	        require("../../assets/icons/Suzy.png"),
	        require("../../assets/icons/Suzy.png"),
	    ],
	    description:
	        "I’m an actress. I have participated in several K-dramas: 'Dream High,' Suzy starred in several popular K-dramas, including 'Gu Family Book' (2013), 'Uncontrollably Fond' (2016), and 'Vagabond' (2019).",
	};

	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const { id } = useLocalSearchParams();
	console.log(id);

	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUserById = async () => {
			const url = `${baseUrl}/api/v1/user/findbyid/${id}`;
			const data = await GetData(url);

			setUser(data);
		};

		getUserById();
	}, []);

	return <Information {...user} />;
};
export default User;
