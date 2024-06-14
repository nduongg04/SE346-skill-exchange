import { View, Text, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity, FlatList, Linking, ActivityIndicator, Alert , KeyboardAvoidingView} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { loadFonts, styles } from "./mainMess.style";
import Expo from 'expo'
import { name as appName } from "../../../app.json"
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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSocketContext } from "../../../context/SocketContext";
import { useSession } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckRefreshToken from "../../../utils/checkrefreshtoken";
import GetData from "../../../utils/getdata";




const ScreenMess = () => {
	const [isFontLoaded, setFontLoaded] = useState(false);
	const [chatRooms, setChatRooms] = useState([]);
	const [chatAppear, setChatAppear] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [accessToken, setAccessToken] = useState('');
	const [searchText, setSearchText] = useState('');
	const prevSearchText = useRef('');
	const navigation = useNavigation();
	const { socket, setSocket, onlineUsers, setOnlineUsers } = useSocketContext()
	const { user, login, logout } = useSession();
	const [latestMessage, setLatestMessage] = useState([]);
	const [checkToken, setCheckToken] = useState(true);
	const isFocused = useIsFocused();
	//Socket
	useEffect(() => {
		if (socket == null)
			return
		socket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users)
		})

		socket.on("getLatestMessage", (res) => {
			
			const msg = latestMessage.findIndex((message) => message.chatID === res.chatID)
			if (msg !== -1) {
				const newLatestMessage = [...latestMessage]
				newLatestMessage[msg] = res
				setLatestMessage(newLatestMessage)
			} else {
				setLatestMessage((prev) => [...prev, res])
			}
		})

		return () => {
			socket.off("getOnlineUsers");
			socket.off("getLatestMessage");
		}
	}, [isFocused, latestMessage, socket])

	useEffect(()=>{   
		socket.on("deleteChatRoom",(res)=>{
			const chatId = res.chatId
			const chatIndex = chatRooms.findIndex((e)=> e.chatInfo._id === chatId)
			if(chatIndex != -1){
				const newChatRooms = [
					...chatRooms.slice(0, chatIndex),
					...chatRooms.slice(chatIndex + 1)
				  ];
				setChatRooms([...newChatRooms])
				setChatAppear([...newChatRooms])
			}
		})
		return () => {
			socket.off("deleteChatRoom");
		}
	}, [chatRooms, socket, chatAppear])

	useEffect(()=>{
		socket.on("getnewchatroom",(chatData)=>{
			setChatAppear([chatData,...chatAppear])
			setChatRooms([chatData,...chatRooms])
		})
		return () => {
			socket.off("getnewchatroom");
		}
	}, [chatRooms, socket, chatAppear])
	
	
	const loadToken = async () => {
		const token = await AsyncStorage.getItem('refreshToken');
		if (token) {
			const access = await CheckRefreshToken(token);
			if (access === null || access === "Session expired") {
				await logout();
			}
			else {
				setAccessToken(access);

			}
		}
		else {
			await logout();
		}
	}

	const loadChat = async () => {
		const url = `https://se346-skillexchangebe.onrender.com/api/v1/chat/find/${user.id}`
		const data = await GetData(url);
		if (data !== "Something went wrong") {
			if (Array.isArray(data)) {
				setChatRooms(data);
				setChatAppear(data);
			}
		}
		setLoading(false);
	}
	useEffect(() => {
		if (searchText !== prevSearchText.current) {
			if (searchText.trim().length > 0) {
				prevSearchText.current = searchText;
				setChatAppear(chatRooms.filter(function (chat) {
					let num = 0;
					if (chat.chatInfo.members[0].id == user.id) {
						num = 1;
					}
					return chat.chatInfo.members[num].username.toLowerCase().includes(searchText.toLowerCase())
				}))

			}
			else {
				prevSearchText.current='';
				setChatAppear(chatRooms);
			}
		}
		// else {
		// 	setSearchText('')
		// }
	}, [searchText]);

	useEffect(() => {
		loadChat();
	}, [isFocused])
	useEffect(() => {
		const loadFont = async () => {
			await loadFonts();
			setFontLoaded(true);
		};
		loadFont();
	}, [])
	if (!isFontLoaded) {
		return null;
	}


	const handleSearch = (text) => {
		setSearchText('' + text);
	}
	const renderItem = ({ item }) => {
		let num = 0;
		let latest = '';
		let format = '';
		if (item.chatInfo.members[0].id == user.id) {
			num = 1;
		}
		let newMessage = item.latestMessage[0]
		const message = latestMessage.find((msg) => msg.chatID === item.chatInfo._id)
		if (message && newMessage) {
			if (newMessage.dateTime < message.dateTime) {
				if (item.chatInfo._id === message.chatID) {
					newMessage = message
				}
			}

		}
		if(message && !newMessage)
			{
				if (item.chatInfo._id === message.chatID) {
					newMessage = message
				}
			}
		if (newMessage) {
			if (newMessage.senderID._id == user.id) {
				format = 'You: '
			}
			if (newMessage.type == 'text') {
				latest = format + newMessage.content
			}
			else {
				latest = format + newMessage.type + " sent.";
			}

		}
		return (
			<TouchableOpacity onPress={() => navigation.navigate('chatRoom/room', { chatId: item.chatInfo._id, chat: item.chatInfo, name: item.chatInfo.members[num].username, idFriend: item.chatInfo.members[num].id})}>
				<CardMessage Name={item.chatInfo.members[num].username}
					Avatar={item.chatInfo.members[num].avatar}
					Status={
						onlineUsers?.some((onlineUser) =>
							onlineUser.userID === item.chatInfo.members[num]._id
						) ? "online" : "offline"
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
					<TextInput placeholder="Search"
						style={styles.Input}
						value={searchText}
						onChangeText={handleSearch}></TextInput>
				</View>
			</View>

			<View style={styles.Scroll} >

				{isLoading ? (
					<ActivityIndicator size="large" color="#FF9557" animating={true} style={{flex:1}}/>
				) :
					(
						(chatAppear.length === 0 || !chatAppear) ? (
							<Text style={{marginHorizontal:"auto", color:'#FF9400', fontSize:16, marginTop:"5%"}}>Let's find more new friends !</Text>
						  ) : (
							<FlatList
							  data={chatAppear}
							  renderItem={renderItem}
							  keyExtractor={(item) => item.chatInfo._id}
							/>
						  )
					)
				}


			</View>
		</View>
	);
};

export default (ScreenMess);
// registerRootComponent(ScreenMess);
