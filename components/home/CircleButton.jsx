import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@constants";

const CircleButton = ({ iconUrl, width, height }) => {
    const borderRadius = 10000;
    const widthIcon = width / 2;
    const heightIcon = height / 2;

    return (
        <TouchableOpacity
            style={{
                width: width,
                height: height,
                backgroundColor: COLORS.lightWhite,
                borderRadius: borderRadius,
                justifyContent: "center",
                alignItems: "center",

                shadowColor: "#0018FF",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 6,
            }}
        >
            <Image
                source={iconUrl}
                style={{ width: widthIcon, height: heightIcon }}
            />
        </TouchableOpacity>
    );
};

export default CircleButton;
