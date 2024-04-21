import React, { useState, useEffect } from 'react';
import { View,Text,ScrollView,TouchableOpacity,Image,TouchableHighligh,TextInput } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { Audio } from 'expo-av';
import {loadFonts,styles} from "./mainRoom.style";

export const  Message=  (props) =>{
    const [isPlay,setIsPlay]=useState(false);
    const [sound,setSound]= useState();
    let contentType;
    const handlePressPlay= async ()=>{
        
        if(!isPlay)
        {
            // console.log(props.Content);
            const { sound } = await Audio.Sound.createAsync({uri: props.Content});
            setSound(sound);
            setIsPlay(!isPlay);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isPlaying && status.didJustFinish) {
                  setIsPlay(false);
                }})
        }
        else
        {
            await sound.stopAsync();
            setIsPlay(!isPlay);
        }
        
    }
    const getFileName= (url)=>{
        const parsedUrl = new URL(url);
        // Lấy phần query params từ URL
        const queryParams = parsedUrl.searchParams;
        // Lấy giá trị của tham số 'alt' từ query params
        const altParam = queryParams.get('alt');
        // Nếu giá trị của tham số 'alt' là 'media', tức là đường dẫn trỏ đến nội dung truyền thông
        if (altParam === 'media') {
            // Lấy phần path từ URL (bao gồm tên tệp)
            const filePath = parsedUrl.pathname;       
            // Tách tên tệp từ phần path
            const fileName = filePath.split('/').pop();
            return fileName.replace('files%2F', '');
        } else {
            console.log('Đường dẫn không trỏ đến nội dung truyền thông.');
        }
    }
    const getFile=()=>{
        props.Function(props.Content);
    }
    if(props.User=="My message")
    {
        switch(props.Type)
    {

        case 'text':
            contentType=<Text  style={styles.Message}> {props.Content}</Text>;
            break;
        case 'image':
            contentType=<View style={{width:150,height:200,borderRadius:20,overflow: 'hidden',marginTop:3, marginRight:5}}><Image  style={{width:'100%',height:'100%',resizeMode:"cover"}} source={{uri: props.Content}}/></View>;
            break;
        case 'record':
            contentType=<View style={{ justifyContent: 'center',alignItems:'center',width:70, height:45,borderRadius:20, backgroundColor:"#F2F2F2" }}>
                <TouchableOpacity onPress={handlePressPlay}>
                    <Image source={isPlay?icons.pause:icons.play} style={isPlay?{width:23, height:23, resizeMode:"cover"}:{width:30, height:30, resizeMode:"cover"}}/>
                </TouchableOpacity>
            </View>;
            break;
        case 'file':
            const fileName= getFileName(props.Content);           
            contentType=
            <TouchableOpacity onPress={getFile} >
                <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center',borderRadius:10, backgroundColor:"#FF823A", paddingVertical:7, marginTop:5,marginRight:5,paddingHorizontal:10}}>             
                    <Image source={icons.file} style={{width:35, height:35, resizeMode:"cover"}}/>
                    <Text style={styles.TextFile}>{fileName}</Text>
                </View>
                </TouchableOpacity>;
           
            break;
    }
    return (
        <View style={styles.Layout} >
            <View style={styles.MessContainer}>
                {contentType}
                
            </View>
            {
                (props.Time!='')?
               (<Text style={styles.Time}>
                {props.Time}
                </Text>):(<View/>)
            }           
        </View>
    )
    }
    else
    {
        switch(props.Type)
    {

        case 'text':
            contentType=<Text  style={styles.Message2}> {props.Content}</Text>;
            break;
        case 'image':
            contentType=<View style={{width:150,height:200,borderRadius:20,overflow: 'hidden',marginTop:3, marginLeft:5}}><Image  style={{width:'100%',height:'100%',resizeMode:"cover"}} source={{uri: props.Content}}/></View>;
            break;e
        case 'record':
            contentType=<View style={{ justifyContent: 'center',alignItems:'center',width:70, height:45,borderRadius:20, backgroundColor:"#F2F2F2" }}>
                <TouchableOpacity onPress={handlePressPlay}>
                    <Image source={isPlay?icons.pause:icons.play} style={isPlay?{width:23, height:23, resizeMode:"cover"}:{width:30, height:30, resizeMode:"cover"}}/>
                </TouchableOpacity>
               
            </View>;
    }
    return (
        <View style={styles.Layout2} >
            <View style={styles.MessContainer}>
           
                <View style={styles.AvatarContainer}>
                <Image source={(props.Avatar=='')?(icons.while_icon):({uri: props.Avatar})}
                            style={styles.Avatar}/>
                </View>
                {contentType}
              
            </View>
            {
                (props.Time!='')?
               (<Text style={styles.Time2}>
                {props.Time}
                </Text>):(<View/>)
            }  
        </View>
    )
    }
   
}