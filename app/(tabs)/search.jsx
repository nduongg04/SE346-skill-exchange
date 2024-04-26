import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import Topic_List from "../../components/Search_Tutorials_Tab/Topic_List";
import Topic_Remarkable_List from "../../components/Search_Tutorials_Tab/Topic_Remarkable_List";
import InputTextBox from "../../components/Search_Tutorials_Tab/Search_Input/InputTextBox";

const Search = () => {
	const screenWidth = Dimensions.get("window").width;
	const backButtonSize = (screenWidth / 100) * 18;

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerTitle: "Search",
				}}
			/>
			<InputTextBox />
			<ScrollView scrollEventThrottle={16}>
				<View
					style={{
						flex: 1,
						backgroundColor: COLORS.lightWhite,
						paddingTop: 20,
					}}
				>
					<View style={{ height: 220, marginTop: 20 }}>
						<Topic_Remarkable_List />
					</View>
					<View style={{ height: 220, marginTop: 20 }}>
						<Topic_List />
					</View>
					<View style={{ marginTop: 20, paddingHorizontal: 20 }}>
						<Text style={{ fontSize: 20, fontWeight: "700" }}>
							Remarkable Issue
						</Text>
						<Text>__________________________</Text>
					</View>
					<View>
						<Topic_Remarkable_List />
					</View>
				</View>
			</ScrollView>
			
		</SafeAreaView>
	);
};

export default Search;
