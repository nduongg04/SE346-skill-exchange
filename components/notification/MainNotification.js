import { View, Text, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity,FlatList,ActivityIndicator, Alert} from "react-native";
import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
// import NavBar from "./NavBar";
import { loadFonts, styles } from "./notification.style";
import Request from "./Requests";
import System from "./System";
import axios from 'axios';
import { useSession } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,useIsFocused } from '@react-navigation/native';
import CheckRefreshToken from "../../utils/checkrefreshtoken";
const ScreenNotification = () => {
  const [isLoading, setLoading] = useState(true);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isRequestTab, setIsRequestTab] = useState(true);
  const[requests, setRequest]= useState([]);
  const[systems, setSystem]=useState([])
  const [accessToken,setAccessToken]=useState('');
  const {user, login, logout} = useSession()
  const isFocused = useIsFocused();
  
  const loadToken= async()=>{
		// const token = await AsyncStorage.getItem('refreshToken');

		// if(token)
		// {

		// 	const access=await CheckRefreshToken(token);
		// 	if(access===null || access=="Session expired")
		// 	{
    //     //await logout();
				
		// 	}
		// 	else
		// 	{
		// 		setAccessToken(access);
		// 	}
		// }
		// else
		// {
		// 	await logout();
		// }
	}
const createChat= async (id1,id2)=>{
		const response= await fetch('https://se346-skillexchangebe.onrender.com/api/v1/chat/create',{
			method:'POST',
			headers:{
			  'Content-Type': 'application/json',
			  Authorization:`Bearer ${accessToken}`
			},
			body: JSON.stringify({
				"firstID": id1,
				"secondID": id2
			})
		  })
		  const data = await response.json();
		  console.log(response.status)
		  console.log(data);
		  if(response.status==400)
		  {
			console.log(response.statusText)
		  }
		  else{
			console.log(response.statusText)
		  }
}
const createRequest= async()=>
{
  const response= await fetch('https://se346-skillexchangebe.onrender.com/api/v1/request/create',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ"
      },
      body: JSON.stringify({
        senderID: "661aceb50b954258a9b6dc70",
        receiverID: "661c1c99928fad8a0e8d01e6"
      })
    })
   data = await response.json();
    console.log(data);
    if(response.status==200)
    {
        console.log('create success')
    }
    else{
      console.log(response.statusText)
    }
}
const refeshReques= (idRemove)=>{
  const newRes= requests.filter((res)=>res._id!==idRemove)
  setRequest(newRes);
}
const getRequest = async () => {
    try {
      const response = await fetch(`https://se346-skillexchangebe.onrender.com/api/v1/request/find/receiver/${user.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${accessToken}`        
        }
      });

      if(response.status==200)
      {
        const json = await response.json();
        setRequest(json.data);
      }
      else
      {
        Alert.alert(
          'Thông báo', 
          'Lỗi kết nối với sever', 
        )
      }
    } catch  {
      Alert.alert(
				'Thông báo', 
				'Ứng dụng đang gặp lỗi', 
			)
    } finally {
      setLoading(false);
    }
};
 
  useEffect(() => {
    loadToken();
    if(accessToken!='')
     getRequest();
  }, [accessToken,isFocused]);
  
  useEffect(() => {
    const loadFont = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
    loadFont();
  }, []);
  if (!isFontLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }
  const handelPress = () => {
   
    setIsRequestTab(true);
    getRequest();
    // postData();
  }
  const handelPress2 = () => {
    setIsRequestTab(false);
    // createRequest();
  }

  return (
    <View style={styles.Horizon} >
      <View style={styles.Container}>
        <Text style={styles.Header}>Notification</Text>
        <View style={styles.Search}>
          <TouchableOpacity onPress={handelPress}>
            <Text style={[styles.Option, isRequestTab && styles.Choose]}>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handelPress2}>
            <Text style={[styles.Option, !isRequestTab && styles.Choose]}>System</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Scroll}>
      {isLoading ? (
        <ActivityIndicator />
      ) :(isRequestTab)?
        (
          <FlatList
            data={requests}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
              <Request Type="Request" Name={item.senderID.username} Avatar={item.senderID.avatar} Time={item.dateTime} Id={item._id} Delete={refeshReques} SenderId={item.senderID.id} MyId={user.id} Acccept={createChat} ></Request>
            )}
          />
        ):
        (<FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <System></System>
        )}
        />)
      }
    </View>
      <View style={styles.navbar}>

      </View>

    </View>
  );

}
export default ScreenNotification;
// registerRootComponent(ScreenNotification);