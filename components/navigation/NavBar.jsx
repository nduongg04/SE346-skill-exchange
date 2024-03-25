import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { COLORS, icons } from "@constants";
import { useRouter } from "expo-router";

const NavBar = ({ state, descriptors, navigation }) => {
	const buttons = [
		{
			iconPressed: icons.home_focused,
			iconNotPressed: icons.home_not_focused,
			name: "home",
		},
		{
			iconPressed: icons.chat_focused,
			iconNotPressed: icons.chat_not_focused,
			name: "chat",
		},
		{
			iconPressed: icons.search,
			iconNotPressed: icons.search,
			name: "search",
		},
		{
			iconPressed: icons.notification_focused,
			iconNotPressed: icons.notification_not_focused,
			name: "notification",
		},
		{
			iconPressed: icons.profile_focused,
			iconNotPressed: icons.profile_not_focused,
			name: "profile",
		},
	];

	const [focusedButton, setFocusedButton] = useState(null);
	const order = ["home", "chat", "search", "notification", "profile"];
	const routes = state.routes.sort(
		(a, b) => order.indexOf(a.name) - order.indexOf(b.name)
	);
	return (
		<View style={styles.container}>
			{routes.map((route, index) => {
				if (route.name === "index") return null;

				const button = buttons.find((button) => button.name === route.name);
				const isPressed = state.index === index;

				const onPressOut = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isPressed && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				if (route.name === "search")
					return (
						<View
							style={{
								flex: 1,
                                height: "100%",
								alignItems: "center",
                                justifyContent: "flex-start",
							}}
							key={index}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.searchButtonContainer}
								onPressIn={() => setFocusedButton(index)}
								onPressOut={() => {
									setFocusedButton(null);
									onPressOut();
								}}
							>
								<View style={styles.whiteCircle}>
									<View style={styles.searchButton}>
										<Image
											source={icons.search}
											style={{ width: 30, height: 30 }}
										/>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					);

				return (
					<TouchableOpacity
						activeOpacity={1}
						key={index}
						style={[
							focusedButton === index ? styles.focusedButton : styles.button,
						]}
						onPressIn={() => setFocusedButton(index)}
						onPressOut={() => {
							setFocusedButton(null);
							onPressOut();
						}}
					>
						<Image
							source={isPressed ? button.iconPressed : button.iconNotPressed}
							style={{ width: 25, height: 25 }}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};
export default NavBar;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		height: "8%",
		backgroundColor: COLORS.lightWhite,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	focusedButton: {
		flex: 1,
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightGray,
	},
	button: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightWhite,
	},
	searchButtonContainer: {
		borderRadius: 9999,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightWhite,
		height: 50,
		width: 50,
	},
	searchButton: {
		borderRadius: 99,
		height: "90%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightPeach,
	},
	whiteCircle: {
		borderRadius: 99,
		justifyContent: "center",
		alignItems: "center",
        height: "100%",
        width: "100%",
		backgroundColor: COLORS.lightWhite,

		shadowColor: COLORS.shadowBlue,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 2.5,
	},
});
