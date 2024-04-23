import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { ProfileCard, Topic } from "../../components";
import Suzy from "@assets/icons/Suzy.png";
import { useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "../../context/AuthContext";
export default function Index() {
	const {user, login} = useSession();
    console.log('User: ', user);
    const [checkToken, setCheckToken] = useState(false);
    const checkTokenFunc = async () => {
        try{
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if(refreshToken != null){
                const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/token/checktoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: refreshToken
                    })
                }).catch((error) => {
                    console.error('Error:', error);
                });
                if(response.ok){
                    const value = true;
                    console.log('Check Token 1: ', value);
                    setCheckToken(value);

                }
            }
        }catch(error){
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        checkTokenFunc();
        console.log('Check Token: ', checkToken);
    }, [checkToken]);
    if(user && checkToken){
        login(user);
        return <Redirect href="/home"  />;
    }
    else
	    return <Redirect href="/signing/Signing"  />;
}
