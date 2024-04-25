import { View,Text,Image,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Linking,ActivityIndicator,Alert } from "react-native";
import React, { useState, useEffect,useRef } from 'react';
import {loadFonts,styles} from "./mainMess.style";
import Expo from 'expo'
import {name as appName} from "../../../app.json"
import { AppRegistry } from "react-native";
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
// import SvgUri from 'react-native-svg-uri';
import CardMessage from "./card_message";
import { render } from "react-dom";
import { useFonts } from 'expo-font';
import { Message } from "../chat_room/message";
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSocketContext } from "../../../context/SocketContext";
import { useSession } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";





const ScreenMess = () => {
	const [isFontLoaded, setFontLoaded] = useState(false);
	const [chatRooms,setChatRooms]=useState([]);
	const[chatAppear,setChatAppear]=useState([]);
	const [isLoading, setLoading] = useState(true);
	const [accessToken,setAccessToken]=useState('');
	const [searchText,setSearchText]=useState('');
	const prevSearchText = useRef('');
	const navigation = useNavigation();
	const {socket,setSocket,onlineUsers,setOnlineUsers} = useSocketContext()
	const {user} = useSession();
	
//Socket
useEffect(()=>{
	if(socket==null)
	return
	socket.on("getOnlineUsers", (users)=>{
		setOnlineUsers(users)
	})

	return ()=>{
		socket.off("getOnlineUsers")
	}
},[])



	const createChat= async ()=>
	{
		const response= await fetch('https://se346-skillexchangebe.onrender.com/api/v1/chat/create',{
			method:'POST',
			headers:{
			  'Content-Type': 'application/json',
			  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ"
			},
			body: JSON.stringify({
				"firstID": "661aceb50b954258a9b6dc70",
				"secondID": "660bfe5a500caf5003a7f407"
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
	const deleteChat=async ()=>{
		try {
            const response = await fetch("https://se346-skillexchangebe.onrender.com/api/v1/chat/delete/661d725075b060d39134b9d9",
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ" ,
              }
            });
			console.log(response);
            console.log(response.status)
      
            if(response.status==400)
            {
              console.log(response.statusText);
            }
            else
            {
				console.log(response.message);
              if(response.message=="Deleted chat successfully")
              {
                console.log("delete success");
              }
              
            }
          } catch (error) {
            console.error(error);
          } finally {
            
          }
	}
	const loadToken= async()=>{
		const token = await AsyncStorage.getItem('refreshToken');
		if(token)
		setAccessToken(token);
	}
	const loadChat=  async ()=>{
		try{
		const response = await axios.get(`https://se346-skillexchangebe.onrender.com/api/v1/chat/find/${user.id}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		  },});
		  if(response.status == 200){
			if (response.data && Array.isArray(response.data.data)) {
				let list= [];
				list =response.data.data;
				setChatRooms(list);
				setChatAppear(list);
			  } else {
				console.error("Invalid data format in response:", response.data);
			  }
			;
		  }
		  else
		  {
			Alert.alert(
				'Thông báo', 
				'Lỗi kết nối với sever', 
			)
		  }
		}
		catch{
			Alert.alert(
				'Thông báo', 
				'Ứng dụng đang gặp lỗi', 
			)
		}
		finally{
			setLoading(false)
		}
		
	}
  useEffect(() => {
	if (searchText !== prevSearchText.current )
	{
		if(searchText.trim().length > 0)
		{
		prevSearchText.current = searchText;
		setChatAppear(chatRooms.filter(function(chat){
			let num=0;
			if(chat.chatInfo.members[0].id==user.id)
			{
				num=1;
			}
			return chat.chatInfo.members[num].username.toLowerCase().includes(searchText.toLowerCase())
		}))
		
		}
		else
		{
			setChatAppear(chatRooms);
		}	
	}
	else
	{
		setSearchText('')
		const loadFont = async () => {
			await loadFonts();
			setFontLoaded(true);
		  };
		  
		  loadFont();
		  loadToken();
		  if(accessToken!='')
		  loadChat();
	}
  }, [searchText,accessToken]);
	if (!isFontLoaded) {
    return null; 
  }
 
  
  const handleSearch=(text)=>{
	setSearchText(''+text);
  }
  const renderItem = ({ item }) => {
	let num=0;
	let latest='';
	let format='';
	if(item.chatInfo.members[0].id==user.id)
	{
		num=1;
	}
	if(item.latestMessage[0])
	{
		if(item.latestMessage[0].senderID.id==user.id)
		{
			format='Bạn: '
		}
		if(item.latestMessage[0].type=='text')
		{
			latest=format+item.latestMessage[0].content
		}
		else
		{
			latest=format+ "Đã gửi một " + item.latestMessage[0].type;
		}
		
	}
	return(
	<TouchableOpacity onPress={()=> navigation.navigate('chatRoom/room', { chatId: item.chatInfo._id , chat: item.chatInfo, name: item.chatInfo.members[num].username })}>
		<CardMessage   Name={item.chatInfo.members[num].username}
		Avatar={item.chatInfo.members[num].avatar}
		Status={
			 onlineUsers?.some((user)=>{
				user.userID === item.chatInfo.members[num]._id
			 }) ? "online" : "offline"
		} 
		Time="30m"
		Recent={latest}

				 />
	</TouchableOpacity>);
	
    
  };


	return (
	  <View style={styles.Horizon} > 
		<View style={styles.Container}>
			<Text style={styles.Header}>Message</Text>
			<View style={styles.Search}>
			<Image source={icons.search_icon} style={styles.IconSearch}></Image>
			<TextInput placeholder="Tìm kiếm"
			 style={styles.Input}
			 value={searchText}
             onChangeText={handleSearch}></TextInput>
			</View>
		</View>		
			
		<View style={styles.Scroll} >

		{isLoading ? (
        <ActivityIndicator />
       ) :
        (<FlatList
			data={chatAppear}
			renderItem={renderItem}
			keyExtractor={(item) => item.chatInfo._id}
		/>)
      }

			
		</View>
	  </View>
	);
  };
  
export default (ScreenMess);
// registerRootComponent(ScreenMess);
