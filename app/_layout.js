import { Stack } from "expo-router";
import { useFonts } from "expo-font";
const Layout = () => {
	const [fontsLoaded] = useFonts({
		NotoExtraBold: require("../assets/fonts/NotoSansSymbols-ExtraBold.ttf"),
		NotoMedium: require("../assets/fonts/NotoSansSymbols-Medium.ttf"),
		NotoRegular: require("../assets/fonts/NotoSansSymbols-Regular.ttf"),
		NotoSemiBold: require("../assets/fonts/NotoSansSymbols-SemiBold.ttf"),
		PolyItalic: require("../assets/fonts/Poly-Italic.ttf"),
		PolyRegular: require("../assets/fonts/Poly-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return <Stack />;
};

export default Layout;
