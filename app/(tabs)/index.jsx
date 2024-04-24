import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { ProfileCard, Topic } from "../../components";
import Suzy from "@assets/icons/Suzy.png";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "../../context/AuthContext";

export default function Index() {
    const [checkToken, setCheckToken] = useState(false);
    const { user } = useSession();

    const checkTokenFunc = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/token/checktoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: refreshToken })
                });
                
                if (response.ok) {
                    console.log('Check Token 1: ', true);
                    setCheckToken(true);
                } else {
                    setCheckToken(false);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        checkTokenFunc();
    }, []); 

    useEffect(() => {
        console.log('Check Token:', checkToken);
        // Handle redirect after state changes.
        if (user && checkToken) {
            console.log("Redirecting to home...");
        } else {
            console.log("Redirecting to sign-in...");
        }
    }, [user, checkToken]);  // This effect handles redirecting

    if (user && checkToken) {
        return <Redirect href="/home" />;
    } else {
        return <Redirect href="/signing/Signing" />;
    }
}
