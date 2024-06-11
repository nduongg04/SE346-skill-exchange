import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SocketProvider } from "../context/SocketContext";
import { AuthProvider, useSession } from "../context/AuthContext";
import ScreenChatRoom from "../components/message/chat_room/MainRoom";

const Layout = () => {
	const [fontsLoaded] = useFonts({
		NotoExtraBold: require("../assets/fonts/NotoSansSymbols-ExtraBold.ttf"),
		NotoMedium: require("../assets/fonts/NotoSansSymbols-Medium.ttf"),
		NotoRegular: require("../assets/fonts/NotoSansSymbols-Regular.ttf"),
		NotoSemiBold: require("../assets/fonts/NotoSansSymbols-SemiBold.ttf"),
		PolyItalic: require("../assets/fonts/Poly-Italic.ttf"),
		PolyRegular: require("../assets/fonts/Poly-Regular.ttf"),
		SegoeUI: require("../assets/fonts/Segoe-UI.ttf"),
		SegoeUISemiBold: require("../assets/fonts/Segoe-UI-SemiBold.ttf"),
        CodaRegular: require("../assets/fonts/Coda-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<AuthProvider>
				<SocketProvider>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="signing/Signing" options={{ headerShown: false }} />
						<Stack.Screen name="chatRoom/room" options={{headerShown:false}} />
						<Stack.Screen name="informationRequest/redirect" options={{headerShown:false}}/>
					</Stack>
				</SocketProvider>
			</AuthProvider>
		</SafeAreaProvider>
	);
};

export default Layout;