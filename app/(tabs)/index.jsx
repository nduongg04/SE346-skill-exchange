import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { ProfileCard, Topic } from "../../components";
import Suzy from "@assets/icons/Suzy.png";
import { useSession } from "../../context/AuthContext";
export default function Index() {
    const {user} = useSession();
    if (user) {
        return <Redirect href="/home" />;
    } else {
        return <Redirect href="/search" />;
    }
    
}
