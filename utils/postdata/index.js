import HandleSessionExpired from "../handlesession";
import axios from "axios";
import CheckRefreshToken from "../checkrefreshtoken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostData = (url, data) => {
	const postUsingAccessToken = async () => {
        console.log("PostData -> url", url)
		const accessToken = await AsyncStorage.getItem("accessToken");
		try {
			const response = await axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(data),
			});
			return response.data;
		} catch (error) {
			if (error.response.status !== 401) {
				// Alert.alert("Error", "Please try again", [
				// 	{
				// 		text: "OK",
				// 		onPress: () => {},
				// 	},
				// ]);
				return "Something went wrong";
			} else {
				const refreshToken = await AsyncStorage.getItem("refreshToken");
				const newAccessToken = await CheckRefreshToken(refreshToken);
				if (newAccessToken === "Session expired") {
					HandleSessionExpired();
				} else {
					await AsyncStorage.setItem("accessToken", newAccessToken);
					postUsingAccessToken();
				}
			}
		}
	};
	return postUsingAccessToken();
};

export default PostData;
