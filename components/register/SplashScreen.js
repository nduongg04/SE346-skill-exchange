import { useState, useEffect } from "react";
import styles from "./style";
import Spinner from "react-native-loading-spinner-overlay";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../../constants";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { useSocketContext } from '../../context/SocketContext';

const SplashScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user,login, logout } = useSession();
    const {socket, setSocket, onlineUsers, setOnlineUsers} = useSocketContext();

    //connect socket
    useEffect(()=>{
        const newSocket= io("https://se346-skillexchangebe.onrender.com")
        setSocket(newSocket)
        console.log("id: "+newSocket.id)
        return ()=>{
            newSocket.disconnect()
        }
    },[user])
    useEffect(() => {
        if (socket === null || user === null) return;
    
        socket.emit("addOnlineUser", user?._id);
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
          console.log(onlineUsers)
        });
        
        return () => {
          socket.off("getOnlineUsers");
        };
      }, [socket, user]);
    //------------------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                var refreshToken;
                try{
                    refreshToken = await AsyncStorage.getItem('refreshToken');
                } 
                catch(e) {
                    navigation.navigate('EnterName');
                    console.log('Failed to fetch the refresh token: ', e.error);
                }
                console.log('refreshToken: ', refreshToken);
                setIsLoading(true);
                if (refreshToken !== null) {
                    const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/token/checktoken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: refreshToken,
                        }),
                    });
                    const user = await AsyncStorage.getItem('user');
                    if (response.ok) {
                        await login(JSON.parse(user));
                        navigation.navigate('(tabs)');
                    } else {
                        await logout();
                        navigation.navigate('EnterName');
                    }
                }
            } catch (e) {
                console.log('Failed to fetch the refresh token: ', e.error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigation]);

    return(
        <LinearGradient
            style={styles.container}
            colors={["#FFBE98", "#7751C7"]}
            >
            <Spinner
                visible={isLoading}
                textContent={'Connecting to server...'}
                textStyle={{ color: COLORS.lightWhite }}
            />

        </LinearGradient>
    )
};
export default SplashScreen;