import { View,Text,Image,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList } from "react-native";
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





const ScreenMess = () => {
	const [isFontLoaded, setFontLoaded] = useState(false);
	const [chatRooms,setChatRooms]=useState([]);
	const[chatAppear,setChatAppear]=useState([]);
	const[myName,setMyName]=useState('Duc');
	const [myId,setMyId]=useState('');
	const [accessToken,setAccessToken]=useState('');
	const [searchText,setSearchText]=useState('');
	const prevSearchText = useRef('');
	const navigation = useNavigation();

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
	const loadChat=  async ()=>{
		const response = await axios.get(`https://se346-skillexchangebe.onrender.com/api/v1/chat/find/661aceb50b954258a9b6dc70`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ',
		  },});
		  if(response.status == 400){
			alert('Something went wrong');
		  }
		  else
		  {
			if (response.data && Array.isArray(response.data.data)) {
				let list= [];
				list =response.data.data;
				console.log(list);
				
				// console.log(typeof(list))
				setChatRooms(list);
				setChatAppear(list);
			  } else {
				console.error("Invalid data format in response:", response.data);
			  }
		  }
	}
  useEffect(() => {
	if (searchText !== prevSearchText.current )
	{
		if(searchText.trim().length > 0)
		{
		prevSearchText.current = searchText;
		// console.log(chatRooms);	
		setChatAppear(chatRooms.filter(function(chat){
			let num=0;
			if(chat.chatInfo.members[0].username==myName)
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
		  setMyId('661aceb50b954258a9b6dc70');
		  setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzAzMzU4OCwiZXhwIjoxNzE1NjI1NTg4fQ.QMwYDQmD7bb7gIspkiK7HfBWZX5tie5SFInVftpGatM');
		  // deleteChat();
		  // createChat();
		  loadChat();
	}
  }, [searchText]);
	if (!isFontLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }
 
  const handleSearch=(text)=>{
	console.log(text)
	setSearchText(''+text);
  }
  const renderItem = ({ item }) => {
	
	// if(item.chatInfo.members[0])
	// {
	// 	console.log(item.chatInfo.members[0]);
	// }
	let num=0;
	let latest='';
	let format='';
	if(item.chatInfo.members[0].username==myName)
	{
		num=1;
	}
	console.log(typeof(item.latestMessage))
	if(item.latestMessage[0])
	{
		if(item.latestMessage[0].senderID.id==myId)
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
	<TouchableOpacity onPress={()=> navigation.navigate('ScreenChatRoom', { chatId: item.chatInfo._id })}>
		<CardMessage   Name={item.chatInfo.members[num].username}
		Avatar={item.chatInfo.members[num].avatar}
		Status="online"
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
			{/* <ScrollView >
			        <CardMessage Name="Rem" Recent="I love you" Status="online" Time="15m"></CardMessage>
					<CardMessage Name="Rem" Recent="I love you too" Status="offline" Time="30m"></CardMessage>
					<CardMessage Name="Rem" Recent="I love you too" Status="offline" Time="30m"></CardMessage>
					<CardMessage Name="Rem" Recent="I love you too" Status="offline" Time="30m"></CardMessage>
					<CardMessage Name="Rem" Recent="I love you too" Status="offline" Time="30m"></CardMessage>
					<CardMessage Name="Rem" Recent="I love you too" Status="offline" Time="30m"></CardMessage>
					<CardMessage></CardMessage>
					<CardMessage></CardMessage>
					<CardMessage></CardMessage>
					<CardMessage></CardMessage>
					<CardMessage></CardMessage>
			</ScrollView>					 */}
			<FlatList
				data={chatAppear}
				renderItem={renderItem}
				keyExtractor={(item) => item.chatInfo._id}
				// keyExtractor={item => item._id}
				// style={styles.flatList}
			/>
		</View>
		<View style={styles.navbar}>
			<Text>Hello</Text>

		</View>
				
	  </View>
	);
  };
  
  export default ScreenMess;
registerRootComponent(ScreenMess);
