import { Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@constants";
const Search = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					title: "Search",
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerTitle: "",
				}}
			/>
			<Text>Search</Text>
		</SafeAreaView>
	);
};

export default Search;
