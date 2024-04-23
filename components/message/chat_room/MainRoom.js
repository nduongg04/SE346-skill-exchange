import React, { useState, useEffect,useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, TextInput,Modal,Linking } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { loadFonts, styles } from "./mainRoom.style";
import { Message } from './message';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import axios from 'axios';
import mime from 'react-native-mime-types';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useSocketContext } from '../../../context/SocketContext';


const ScreenChatRoom = ({router}) => {
  const route = useRoute();
  const scrollViewRef = useRef(null);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState([]);
  const [record, setRecord] = useState();
  const [isRecord, setIsRecord] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [idCount,setIdCount]=useState(null);
  const [myId,setMyid]=useState("661aceb50b954258a9b6dc70");
  const [accessToken,setAccessToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ');
  const [messageList, setMessageList]=useState([]);
  const[myName,setMyName]=useState('Duc');
  const[chatId,setChatId]=useState(route.params.chatId)//router.param.chatID
  const {chat} = route.params
  const [newMessageData, setNewMessage] = useState(null)
  const [test, setTest]= useState('');
  const {socket,setSocket,onlineUsers,setOnlineUsers}= useSocketContext()
  const recipientID = chat?.members?.find((member)=> member.id !== myId)
//socket send message
  useEffect(()=>{
    if(socket===null) return
    
    socket.emit("sendMessage", {...newMessageData,recipientID})
  },[message])

//reciever Socket
  useEffect(()=>{
    if(socket===null) return
    socket.on("getMessage", (res)=>{
      if(chatId !== res.chatID) return
      setMessageList([...messageList, res])
    })
  }, [socket, messageList, setMessageList])

  //set up
  const formatTimeRecord = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60); 
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const formatTimeMessage=(time)=>{
    const hours = Math.floor(time.getHours());
    const minutes = Math.floor(time.getMinutes()); 
    const formattedMinutes = String(minutes).padStart(2, '0');
   let formattedHours=hours
    if(hours>=10)
    {
      formattedHours = String(hours).padStart(2, '0');
    }
   
    return `${formattedHours}:${formattedMinutes}`;
  }
  let getFile= async (url)=>{
      const parsedUrl = new URL(url);
        const queryParams = parsedUrl.searchParams;
        const altParam = queryParams.get('alt');
        if (altParam === 'media') {
            const filePath = parsedUrl.pathname;       
            const fileNameEncoded = filePath.split('/').pop();
            const fileName=fileNameEncoded.replace('files%2F', '');
            const fileUri = `file:///storage/emulated/0/Download/${fileName}`;
            try {
              await Linking.openURL(fileUri);
            } catch (error)  {
              Linking.openURL(url)
              .catch((err) => console.error('Không thể mở URL:', err));
            }
          } else {
            console.log('Đường dẫn không trỏ đến nội dung truyền thông.');
        }
    
  };
  const renderMessage= ()=>
  {
    const list=[];
    if(messageList.length!=0)
    {
      for(let i=0;i<messageList.length;i++)
      {
        let sender=''
        // console.log((messageList));
        if(messageList[i].senderID._id === myId)
        {
          sender="My message"
        }
        if((i+1)<messageList.length )
        {
          if(messageList[i].senderID.username==messageList[i+1].senderID.username)
          {
          list.push(<Message key={i} User={sender} Content={messageList[i].content} Time='' Avartar='' Type={messageList[i].type} Function={getFile}  />);
          }
          else
          {
            let time= new Date(messageList[i].dateTime);  
            list.push(<Message key={i} User={sender} Content={messageList[i].content} Time={formatTimeMessage(time)} Avatar={messageList[i].senderID.avatar} Type={messageList[i].type} Function={getFile} />);
          }    
        }
        else
          {
            let time= new Date(messageList[i].dateTime);
          
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
  const loadMessage = async ()=>{
    const response = await axios.get(`https://se346-skillexchangebe.onrender.com/api/v1/message/find/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFhY2ViNTBiOTU0MjU4YTliNmRjNzAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODI5NSwiZXhwIjoxNzE1NzkwMjk1fQ.4EHaQTxyYqJrQARjGcPXBYG6BYUOTRzZ51tYBju6JRQ',
      },}); 
      if(response.status==200){
        setMessageList(response.data.data);
      }
      else
      {
       alert("Something went wrong")
      }
  }
  const sendMessage= async(Type,Content)=>{
    if(!Content)
    Content=message
    const response= await fetch('https://se346-skillexchangebe.onrender.com/api/v1/message/send',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization:`Bearer ${accessToken}`
      },
      body: JSON.stringify({
       chatID:`${chatId}`,
       senderID:`${myId}`,
       content:Content,
       type:Type,
      })
    });
    if(response.status==200)
    {
      const json = await response.json();
      setNewMessage(json.data)
      setMessageList([...messageList,json.data])
    }
    else{
      alert("Something went wrong");
    }
    
    
  }
  const uploadImage = async (imageUri, name) => {
    const formData = new FormData();
    const extension = imageUri.split('.').pop();
    const type = mime.lookup(extension) || 'image/jpeg';
    formData.append('image', {
        name: `${name}`,
        type: type,
        uri: imageUri,
    });
    try{
      const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/image', {
          method: 'POST',
          body: formData,
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      if(response.ok){
        const json = await response.json();
        console.log("Up: "+json.image);
        return json.image;
      }
      else{
        console.log(JSON.stringify(response));
        alert('Upload image failed: ' + response.status);
        return false;
      }
    }
    catch(error){
      alert('Upload image failed: ' + error.message);
      return false;
    }
  }
  const uploadFile = async (recordUri, name) => {
    console.log(recordUri);
    const formData = new FormData();
    const extension = recordUri.split('.').pop();
    const type = mime.lookup(extension) ;
    formData.append('file', {
        name: `${name}`,
        type: type,
        uri: recordUri,
    });
    try{
      const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/file', {
          method: 'POST',
          body: formData,
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:`Bearer ${accessToken}`
          },
      });
      if(response.ok){
        console.log(response);
        const json = await response.json();
        console.log(json)
        return json;
      }
      else{
        console.log(JSON.stringify(response));
        alert('Upload record failed: ' + response.status);
        return false;
      }
    }
    catch(error){
      alert('Upload record failed: ' + error.message);
      return false;
    }
  }
  useEffect(() => {
    const loadFont = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
    loadFont();
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

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setIsRecord(true);
      setIdCount( setInterval(() => {
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
      setTest(''+ uri);
      console.log('Recording URI:', record);
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
    let image=[];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const listImage = Array.from(result.assets);
      for(let i=0;i<listImage.length;i++)
      {
        let imageUri=await uploadImage(listImage[i].uri,myId);
        console.log(imageUri)
          if(imageUri)
          {
            image.push(imageUri);
          }
      }
      const Image=image.join(" ");
      setMessage(Image);
      await sendMessage('image',Image);
      setMessage('');

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
      image=result.assets;
      const imageUrl= await uploadImage(image.uri,myId)
      if(imageUrl)
      {
        sendMessage('image',imageUrl);
        setMessage('');
      }
      else{
        
      }
     
    }
  };
  const handleChooseFile= async ()=>
  {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*',
      });
      const name=result.assets[0].name
      const uri=result.assets[0].uri
      const response = await uploadFile(uri, name);
      if(response)
      {
        console.log(response);
        sendMessage('file',response.image)
      }
      else{
        alert("Gửi file không thành công");
      }

    }
    catch (error) {
      console.log(`Error picking document`);
  }
  }
  //send
  const handleSendMessage =async ()=>{
    //Record
    if(isRecord)
    {
      await stopRecording();
      const response= await uploadFile(record.getURI(),myId);
      console.log(response)
      if(response)
      {
        // const test = await fetch(response);
        // const blob= await test.blob();
        // const fileUri = `${FileSystem.cacheDirectory}audio.mp3`;
        // await FileSystem.writeAsStringAsync(fileUri, blob, {
        //     encoding: FileSystem.EncodingType.Base64,
        // });

        // // Tạo đối tượng Sound từ đường dẫn file
        // const soundObject = new Audio.Sound();
        // await soundObject.loadAsync({ uri: fileUri });

        // // Phát âm thanh
        // await soundObject.playAsync();
      }
      
    }
    else
    {
      sendMessage('text');
      setMessage('');
    }
    
    


    
  };
 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity >
          <Image source={icons.back} style={[{ height: 25.5, width: 25.5,marginRight:32}]}  ></Image>
        </TouchableOpacity>
        <Text style={styles.Name}>Đạt FA</Text>
        <TouchableOpacity >
          <Image source={icons.call} style={{ height: 20.5, width: 20.5 }}></Image>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={icons.video} style={{ height: 20, width: 23.5,marginLeft:10 }} />
        </TouchableOpacity>
      </View>
    
      <ScrollView style={styles.Scroll} 
      keyboardShouldPersistTaps="handled" 
      showsVerticalScrollIndicator={false} 
      onKeyboardDidShow={handleKeyboardDidShow}
      contentContainerStyle={styles.scrollViewContainer}
      onContentSizeChange={(contentWidth, contentHeight) => {
      scrollViewRef.current.scrollToEnd({ animated: true });}}
      ref={scrollViewRef} >
              
        {renderMessage()}   
        {/* <Message User="My message" Content={test} Time={""} Avatar={""} Type="record" />      */}
       </ScrollView>
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
                <Image source={icons.clock} style={{ height: 15.4, width: 13.2, marginRight: 0, marginTop:2.3 }} />
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
     
    </View>
    </KeyboardAvoidingView>
    
  )
}
export default (ScreenChatRoom);
registerRootComponent(ScreenChatRoom);