const HandleSessionExpired = () => {
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

export default HandleSessionExpired;