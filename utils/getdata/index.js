import CheckRefreshToken from "../checkrefreshtoken";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSessionExpired = () => {
	Alert.alert("Session Expired", "Please login again", [
		{
			text: "OK",
			onPress: () => {
				AsyncStorage.removeItem("refreshToken");
				AsyncStorage.removeItem("accessToken");
			},
		},
	]);
	router.replace("/login");
};

const GetData = async (url) => {
	const accessToken = await AsyncStorage.getItem("accessToken");
	const refreshToken = await AsyncStorage.getItem("refreshToken");

	const getUsingAccessToken = async () => {
		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (response.status === 401) {
				return null;
			}
			return response.data;
		} catch (error) {
			Alert.alert("Error", "Please try again", [
				{
					text: "OK",
					onPress: () => {},
				},
			]);
		}
	};

	const checkRefreshToken = async () => {
		if (!refreshToken) {
			handleSessionExpired();
		}
		const accessToken = CheckRefreshToken(refreshToken);
		if (accessToken === null) {
			handleSessionExpired();
		}
		AsyncStorage.setItem("accessToken", accessToken);
	};
	const data = await getUsingAccessToken();
    if (data === null) {
        await checkRefreshToken();
        const newData = await getUsingAccessToken();
        return newData.data;
    }
    return data.data;
};

export default GetData;
