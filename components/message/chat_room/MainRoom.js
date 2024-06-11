import React, { useState, useEffect, useRef,useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Modal, Linking, ActivityIndicator, Alert } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { loadFonts, styles } from "./mainRoom.style";
import { Message } from './message';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import axios from 'axios';
import mime from 'react-native-mime-types';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useSocketContext } from '../../../context/SocketContext';
import { useNavigation } from '@react-navigation/native';
import { useSession } from '../../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../loadingOverlay';
import CheckRefreshToken from '../../../utils/checkrefreshtoken';
import GetData from '../../../utils/getdata';
import PostData from '../../../utils/postdata';
import HandleSessionExpired from '../../../utils/handlesession';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageProvider, MessageContext } from './messageContext';
const ScreenChatRoom = ({ router }) => {
  const route = useRoute();
  const { user, login, logout } = useSession();
  const scrollViewRef = useRef(null);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  const [record, setRecord] = useState();
  const [isRecord, setIsRecord] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [idCount, setIdCount] = useState(null);
  const [isRecordMessage, setIsRecordMessage] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [chatId, setChatId] = useState(route.params.chatId)//router.param.chatID
  const { chat } = route.params
  const [newMessageData, setNewMessage] = useState(null)
  const [test, setTest] = useState('');
  const { socket, setSocket, onlineUsers, setOnlineUsers } = useSocketContext()
  const [isLoading, setLoading] = useState(true);
  const [isUploading, setUploading] = useState(false);
  // const {soundcheck, setSoundCheck} = useContext(MessageContext);


  const name = route.params.name
  // const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  //socket send message
  useEffect(() => {
    if (socket === null) return
    const recipientID = chat?.members?.find((member) => member.id !== user.id)._id
    console.log(recipientID)
    console.log("socket " + socket.id)
    socket.emit("sendMessage", { ...newMessageData, recipientID })
  }, [newMessageData])

  //reciever Socket
  useEffect(() => {
    if (socket === null) return

    console.log("socket ")
    socket.on("getMessage", (res) => {
      if (chatId !== res.chatID) return
      setMessageList([...messageList, res])
    })

    return () => {
      socket.off("getMessage")
    }
  }, [socket, messageList])

  //set up
  const formatTimeRecord = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const formatTimeMessage = (time) => {
    const hours = Math.floor(time.getHours());
    const minutes = Math.floor(time.getMinutes());
    const formattedMinutes = String(minutes).padStart(2, '0');
    let formattedHours = hours
    if (hours >= 10) {
      formattedHours = String(hours).padStart(2, '0');
    }

    return `${formattedHours}:${formattedMinutes}`;
  }
  let getFile = async (url) => {
    const parsedUrl = new URL(url);
    const queryParams = parsedUrl.searchParams;
    const altParam = queryParams.get('alt');
    if (altParam === 'media') {
      const filePath = parsedUrl.pathname;
      const fileNameEncoded = filePath.split('/').pop();
      const fileName = fileNameEncoded.replace('files%2F', '');
      const fileUri = `file:///storage/emulated/0/Download/${fileName}`;
      try {
        await Linking.openURL(fileUri);
      } catch (error) {
        Linking.openURL(url)
          .catch((err) => console.error('Không thể mở URL:', err));
      }
    } else {
      console.log('Đường dẫn không trỏ đến nội dung truyền thông.');
    }

  };
  const renderMessage = () => {
    const list = [];
    if (messageList.length != 0) {
      for (let i = 0; i < messageList.length; i++) {
        let sender = ''
        // console.log((messageList));
        if (messageList[i].senderID.id === user.id) {
          sender = "My message"
        }
        if ((i + 1) < messageList.length) {
          if (messageList[i].senderID.id == messageList[i + 1].senderID.id) {
            list.push(<Message key={i} User={sender} Content={messageList[i].content} Time='' Avatar='no' Type={messageList[i].type} Function={getFile} />);
          }
          else {
            let time = new Date(messageList[i].dateTime);
            list.push(<Message key={i} User={sender} Content={messageList[i].content} Time={formatTimeMessage(time)} Avatar={messageList[i].senderID.avatar} Type={messageList[i].type} Function={getFile} />);
          }
        }
        else {
          let time = new Date(messageList[i].dateTime);

          list.push(<Message key={i} User={sender} Content={messageList[i].content} Time={formatTimeMessage(time)} Avatar={messageList[i].senderID.avatar} Type={messageList[i].type} Function={getFile} />);
        }

      }
      return list;
    }

  }
  const handleKeyboardDidShow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true }); // Cuộn xuống cuối của ScrollView
  };

  //Load
  const loadToken = async () => {
    const token = await AsyncStorage.getItem('refreshToken');
    if (token) {
      const access = await CheckRefreshToken(token);
      if (access === null || access == "Session expired") {
        HandleSessionExpired();
      }
      else {
        await AsyncStorage.setItem('accessToken', access);
        return access;
      }
    }
    else {
      HandleSessionExpired();
    }
  }

  const loadMessage = async () => {
    const url = `https://se346-skillexchangebe.onrender.com/api/v1/message/find/${chatId}`
    const data = await GetData(url);
    if (data !== "Something went wrong") {
      setMessageList(data);
    }

    setLoading(false);
  }

  const sendMessage = async (Type, Content) => {
    if (!Content)
      Content = message;
    const dataPost = {
      chatID: `${chatId}`,
      senderID: `${user.id}`,
      content: Content,
      type: Type,
    }
    const url = 'https://se346-skillexchangebe.onrender.com/api/v1/message/send';
    const response = await PostData(url, dataPost);
    if (response != 404 && response !== "Something went wrong" && response) {
      setNewMessage(response.data)
      setMessageList([...messageList, response.data])
      return true
    }
    else {
      Alert.alert(
        'Thông báo',
        'Không gửi được tin nhắn',)
      return false
    }
  }

  const uploadImage = async (imageUri, name) => {
    const access = await AsyncStorage.getItem("accessToken");
    const formData = new FormData();
    const extension = imageUri.split('.').pop();
    const type = mime.lookup(extension);
    formData.append('file', {
      name: `${name}`,
      type: type,
      uri: imageUri,
    });
    try {
      const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/file', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(response)
      if (response.status == 200) {
        const json = await response.json();
        return json.image;
      }
      else {
        if (response.status == 401) {
          access = await loadToken();
          const response2 = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/file', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${access}`,
            },
          });
          if (response2.status == 200) {
            const json = await response2.json();
            return json.image;
          }
        }
      }
      Alert.alert(
        'Thông báo',
        'Không gửi được ảnh',)
      return false;
    }
    catch (error) {
      Alert.alert(
        'Thông báo',
        'Không gửi được ảnh',)
      return false;
    }
    finally {
      setUploading(false)
    }
  }

  const uploadFile = async (recordUri, name) => {
   //Loai bo ki tu dac biet
    name = name.replace(/[()"',;:\\/?]/g, "")
    console.log(name)
    const access= await AsyncStorage.getItem("accessToken");
    const formData = new FormData();
    const extension = recordUri.split('.').pop();
    const type = mime.lookup(extension);
    console.log(type)
    console.log(recordUri)
    formData.append('file', {
      name: name,
      type: type,
      uri: recordUri,
    });
    try {
      const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/file', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.status == 200) {
        const json = await response.json();
        return json.image;
      }
      else {
        console.log(await response.text())
        if (response.status == 401) {
          access = await loadToken();
          const response2 = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/file', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${access}`,
            },
          });
          if (response2.status == 200) {
            const json = await response2.json();
            return json.image;
          }
        }
      }
      Alert.alert(
        'Thông báo',
        'Không gửi được file',)
      return false;
    }
    catch (error) {
      Alert.alert(
        'Thông báo',
        'Không gửi được file',)
      return false;
    }
    finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    const loadFont = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
    loadFont();
    // loadToken();
    // if(accessToken!='')
    loadMessage();
  }, []);
  if (!isFontLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  };
  //Record
  const startRecording = async () => {
    setRecord(null);
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access microphone denied');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setIsRecord(true);
      setIdCount(setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000));
      setRecord(newRecording);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };
  const stopRecording = async () => {
    try {
      await record.stopAndUnloadAsync();
      console.log('Recording stopped');
      const uri = record.getURI();
      setTest('' + uri);
      setIsRecord(false);
      clearInterval(idCount);
      setSeconds(0);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };



  //handle
  const handleMessageChange = (text) => {
    setMessage(text);
  };
  const handleChooseImage = async () => {
    let image = [];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      // allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setUploading(true);
      const listImage = Array.from(result.assets);
      for (let i = 0; i < listImage.length; i++) {
        let imageUri = await uploadImage(listImage[i].uri, user.id);
        console.log(imageUri)
        if (imageUri) {
          image.push(imageUri);
        }
      }
      const Image = image.join(" ");
      // setMessage(Image);
      if (image.length > 0)
        await sendMessage('image', Image);
      // setMessage('');
      setUploading(false);

    }
  };
  const handleCamera = async () => {
    let image;
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setUploading(true);
      image = result.assets;
      console.log(image[0].uri)
      const imageUrl = await uploadImage(image[0].uri, user.id)
      if (imageUrl) {
        sendMessage('image', imageUrl);
        setMessage('');
      }
    }
  };
  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*',
      });
      const name = result.assets[0].name
      //const formatName= encodeURIComponent(name);
      const uri = result.assets[0].uri
      setUploading(true);
      const response = await uploadFile(uri, name);
      if (response) {
        sendMessage('file', response)
      }
      else {
        alert("Gửi file không thành công");
      }

    }
    catch (error) {
      console.log(`Error picking document`);
    }
    finally {
      setUploading(false)
    }
  }
  //send
  const handleSendMessage = async () => {
    //Record
    if (isRecord) {
      await stopRecording();
      setUploading(true);
      const currentTime = new Date();
      const timestamp = currentTime.getTime();
      const response = await uploadFile(record.getURI(), ""+timestamp);
      console.log(response)
      if (response) {
        await sendMessage('record', response);
        // setMessage('')
      }
      setUploading(false);

    }
    else {
      if (await sendMessage('text')) {
        setMessage('');
      }
    }
  };



  return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <MessageProvider>
          <View style={styles.Container}>

          <View style={styles.Header}>
            <TouchableOpacity onPress={() => { navigation.goBack('(tabs)'); }} >
              <Image source={icons.back} style={[{ height: 25, width: 25.5, marginRight: 40 }]}  ></Image>
            </TouchableOpacity>
            <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
            <TouchableOpacity >
              <Image source={icons.call} style={{ height: 20.5, width: 20.5 }}></Image>
            </TouchableOpacity>
            <TouchableOpacity >
              <Image source={icons.video} style={{ height: 20, width: 23.5, marginLeft: 10 }} />
            </TouchableOpacity>

          </View>
          <LinearGradient style={{ height: 1.2, backgroundColor: '#F7F7F7' }}
            colors={["#C0BDBD", "#ffffff"]}>
          </LinearGradient>


          {isLoading ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator size="large" color="#FF9557" animating={true} />
            </View>
          ) :
            (
              <ScrollView style={styles.Scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                onKeyboardDidShow={handleKeyboardDidShow}
                contentContainerStyle={styles.scrollViewContainer}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }}
                ref={scrollViewRef} >
                {renderMessage()}

              </ScrollView>

            )
          }
          {/* <Message User="My message" Content={"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2F661aceb50b954258a9b6dc70?alt=media&token=57eed036-d8da-41e8-b97a-bc752a553243"} Time={""} Avatar={""} Type="record" />      */}


          {/* bottom */}
          <View style={styles.Bottom}>

            {
              !isRecord ?
                (
                  <View style={styles.Input}>
                    <TextInput value={message}
                      onChangeText={handleMessageChange}
                      multiline={true}
                      placeholder="Nhắn tin" />
                  </View>
                ) : (
                  <>
                    <TouchableOpacity onPress={stopRecording} >
                      <Image source={icons.delete_icon} style={{ height: 24.5, width: 22, marginRight: 8 }} />
                    </TouchableOpacity>
                    <View style={styles.RecordContainer} >
                      <Image source={icons.clock} style={{ height: 15.4, width: 13.2, marginRight: 0, marginTop: 2.3 }} />
                      <Text style={styles.TimeRecord}>{formatTimeRecord(seconds)}</Text>
                    </View>
                  </>


                )
            }

            {(message.trim().length > 0) || (isRecord) ? (
              <TouchableOpacity onPress={handleSendMessage} >
                <Image source={icons.send} style={{ height: 29, width: 29, marginLeft: 7 }} />
              </TouchableOpacity>) : (
              <>
                <TouchableOpacity onPress={startRecording} >
                  <Image source={icons.micro} style={{ height: 27.6, width: 27.6, marginLeft: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCamera} >
                  <Image source={icons.camera} style={{ height: 28, width: 28, marginLeft: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChooseImage} >
                  <Image source={icons.image} style={{ height: 22, width: 22.1, marginLeft: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChooseFile} >
                  <Image source={icons.menu} style={{ height: 20, width: 23.5, marginLeft: 10 }} />
                </TouchableOpacity>
              </>
            )}

          </View>
          <LoadingOverlay visible={isUploading} />
        </View>
        </MessageProvider>
      </KeyboardAvoidingView>
   
  )
}
export default (ScreenChatRoom);
// registerRootComponent(ScreenChatRoom);