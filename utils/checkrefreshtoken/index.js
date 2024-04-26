import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const CheckRefreshToken = (refreshToken) => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";
	const getNewAccessToken = async () => {
		try {
			const response = await axios.get(baseUrl + "/api/v1/auth/refresh", {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			});
			if (response.status === 200) {
				const newAccessToken = response.data.access_token;
				return newAccessToken;
			} else if (response.status === 401) {
				return null;
			} else {
				return "";
			}
		} catch (error) {
			console.error(error);
		}
	};

	getNewAccessToken().then((newAccessToken) => {
		return newAccessToken;
	});
};

export default CheckRefreshToken;
