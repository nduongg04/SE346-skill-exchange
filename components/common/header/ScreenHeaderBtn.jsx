import { View, Text } from "react-native";
import { COLORS, FONTS } from "@constants";
import { Image } from "expo-image";
import favicon from "@assets/favicon.png";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
const ScreenHeaderBtn = () => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
            }}
            onPointerDown={() => router.replace("/home")}
        >
            <Image
                style={{ width: 40, height: 40 }}
                source={favicon}
                placeholder="Hi"
                contentFit="cover"
                transition={1000}
            />
            <Text
                style={{
                    fontFamily: "PolyRegular",
                    color: COLORS.skyBlue,
                    fontSize: 20,
                }}
            >
                Skill Exchange
            </Text>
        </View>
    );
};

export default ScreenHeaderBtn;
