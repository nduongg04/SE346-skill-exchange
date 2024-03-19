import { View, Text } from "react-native";
import { COLORS, FONTS } from "@constants";
import { Image } from "expo-image";
import favicon from "@assets/favicon.svg";
import { router } from "expo-router";
import style from "./screenheaderbtn.style";
const ScreenHeaderBtn = () => {
    return (
        <View
            style={style.container}
            onPointerDown={() => router.replace("/home")}
        >
            <Image
                style={style.favicon}
                source={favicon}
                placeholder="Hi"
                contentFit="cover"
                transition={1000}
            />
            <Text
                style={style.appNameText}
            >
                Skill Exchange
            </Text>
        </View>
    );
};

export default ScreenHeaderBtn;
