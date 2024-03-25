import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@constants";
import styles from "./circlebutton.style";

const CircleButton = ({ iconUrl, width, height, borderRadius = 1000, handlePress }) => {
    const widthIcon = width / 2;
    const heightIcon = height / 2;

    return (
        <TouchableOpacity
            activeOpacity={0.2}
            style={styles.button(width, height, borderRadius)}
        >
            <Image
                source={iconUrl}
                style={{ width: widthIcon, height: heightIcon }}
            />
        </TouchableOpacity>
    );
};

export default CircleButton;
