import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TouchableHighligh, TextInput,Modal } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { loadFonts, styles } from "./mainRoom.style";
import { Message } from './message';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import axios from 'axios';
const ScreenChatRoom = (props) => {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState([]);
  const [record, setRecord] = useState(null);
  const [isRecord, setIsRecord] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [idCount,setIdCount]=useState(null);
  const [myId,setMyid]=useState(null);
  const [accessToken,setAccessToken]=useState('');
  const [messageList, setMessageList]=useState([]);
  const[myName,setMyName]=useState('');
  const[isUploadImage,setIsUpLoadImage]=useState('false')
  const[chatId,setChatId]=useState(props.chatID)
  const loadMessage = async ()=>{
    const response = await axios.get('https://se346-skillexchangebe.onrender.com/api/v1/message/find/'+'6606f3bb5089c2a459ab593e', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA2ZjNiYjUwODljMmE0NTlhYjU5M2UiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMjIzODI2NCwiZXhwIjoxNzE0ODMwMjY0fQ._iefzCcQ0g4GXat9l-2quzeyf4ZWd9wQ1iN1JSaSG2Y',
      },});
      if(response.ok){
       const json=response.json();
        setMessageList(json.data);
      }
      else
      {
       alert("Something went wrong")
      }
  }
  const sendMessage= async(Type)=>{
    const response= await axios.post('https://se346-skillexchangebe.onrender.com/api/v1/message/send',{
      method:'POST',
      headers:{
        Authorization:`${accessToken}`
      },
      body: JSON.stringify({
       chatID:`${chatId}`,
       senderID:`${myId}`,
       content:message,
       type:Type,
      })
    })
    const json = await response.json();
    if(json.message=="Send message successfully")
    {
        //xử lí tin nhắn đã gửi
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
  const uploadRecord = async (recordUri, name) => {
    const formData = new FormData();
    const extension = recordUri.split('.').pop();
    const type = mime.lookup(extension) || 'audio/mpeg';
    formData.append('audio', {
        name: `${name}.mp3`,
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
        const json = await response.json();
        return json.record;
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
      // const uri = record.getURI();
      console.log('Recording URI:', record);
      setIsRecord(false);
      clearInterval(idCount);
      setSeconds(0);        
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };
  const handleChooseImage = async () => {
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
          if(uploadImage(listImage[i].uri,myId))
          {
            image.push(uploadImage(listImage[i].uri,myId));
          }
      }
      message=image.join(" ");
      sendMessage('image');
      setMessage('');

    }
  };

  const handleCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets);
      message=uploadImage(image.uri);
      sendMessage('image');
      setMessage('');
    }
  };

  const handleSendMessage =()=>{
    //Record
    if(isRecord)
    {
      stopRecording();
      if(uploadRecord(record,myId))
      {
        setMessage('');
        message=uploadRecord(record,myId);
        sendMessage('record');
      }
      
    }
    //message text
    if(message.trim().length>0)
    {
        sendMessage('text');
        setMessage('');
    }


    
  };
  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60); 
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const renderMessage= ()=>
  {
    const list=[];
    if(messageList.length!=0)
    {
      for(let i=0;i<messageList.length;i++)
      {
        const sender=''
        if(messageList[i].senderID.username==myName)
        {
          sender="My message"
        }
        if((i+1)<=messageList.length && messageList[i].senderID.username==messageList[i+1].senderID.username)
        {
          list.push(<Message User={sender} Text={messageList[i].content} Time='' Avartar='' Type={messageList[i].type}  />);
        }
        else
        {
          const time=messageList[i].dateTime; 
          list.push(<Message User={sender} Text={messageList[i].content} Time={`${time.getHours()}:${time.getMinutes()}`} Avartar={messageList[i].senderID.avartar} Type={messageList[i].type} />);
        }       
      }
    }
      
  }
  const toogleUploadModal=()=>
  {
    setIsUpLoadImage(!isUploadImage);
   
  }

  return (
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

      <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer} >
        <Message User={"Người gửi"} Content={"https://s1.zerochan.net/Rem.%28Re%3AZero%29.600.3918671.jpg"} Time={"5:20"} Type={'image'}></Message>
        <Message User={"Người nhận"}></Message>
        
        <Message User={"Người nhận"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người nhận"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người nhận"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người nhận"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người nhận"}></Message>
        <Message User={"Người gửi"}></Message>
        <Message User={"Người nhận"}></Message>
        
        {/* {renderMessage()} */}
       
      </ScrollView>

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
                <Text style={styles.TimeRecord}>{formatTime(seconds)}</Text>
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
              <Image source={icons.image} style={{ height: 22, width: 22, marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Image source={icons.menu} style={{ height: 20, width: 23.5, marginLeft: 10 }} />
            </TouchableOpacity>
          </>
        )}

      </View>
    </View>
  )


}
registerRootComponent(ScreenChatRoom);