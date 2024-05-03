import React, { useState } from "react";
import { SafeAreaView, SectionList, Text, Dimensions, View } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import Topic_List from "../../components/Search_Tutorials_Tab/Topic_List";
import Topic_Remarkable_List from "../../components/Search_Tutorials_Tab/Topic_Remarkable_List";
import InputTextBox from "../../components/Search_Tutorials_Tab/Search_Input/InputTextBox";

// Search.jsx
const Search = () => {
    const screenWidth = Dimensions.get("window").width;
    const backButtonSize = (screenWidth / 100) * 18;

    const sections = [
        { title: 'Topic Remarkable List', data: ['Topic_Remarkable_List'] },
        { title: 'Topic List', data: ['Topic_List'] },
        { title: 'Remarkable Issue', data: ['Topic_Remarkable_List'] },
    ];

    const renderItem = ({ item }) => {
        switch (item) {
            case 'Topic_Remarkable_List':
                return <Topic_Remarkable_List />;
            case 'Topic_List':
                return <Topic_List />;
            default:
                return null;
        }
    };

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
            <SectionList
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>{title}</Text>
                        <Text>__________________________</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Search;