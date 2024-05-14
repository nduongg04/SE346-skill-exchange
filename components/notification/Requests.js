import React from 'react'
import { View,Text,Image,TouchableOpacity,Button ,Alert} from 'react-native'
import {loadFonts,styles} from "./notification.style";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Request=(props)=>
{
    const createChat= async (id1,id2)=>{
        const token= await AsyncStorage.getItem('accessToken');
        try{
            const response= await fetch('https://se346-skillexchangebe.onrender.com/api/v1/chat/create',{
			method:'POST',
			headers:{
			  'Content-Type': 'application/json',
			  Authorization:`Bearer ${token}`
			},
			body: JSON.stringify({
				"firstID": id1,
				"secondID": id2
			})
		  })
		  if(response.status==200)
		  {
			return true
		  }
		  else{
            Alert.alert(
                'Thông báo', 
                'Kết bạn không thành công', 
            )
			return false
		  }
        }
        catch{
            Alert.alert(
                'Thông báo', 
                'Kết bạn không thành công', 
            )
            return false
         }

       
		
    }
    const deleteRequest=async ()=>{
        try {
            const response = await fetch(`https://se346-skillexchangebe.onrender.com/api/v1/request/delete/${props.Id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjMWM5OTkyOGZhZDhhMGU4ZDAxZTYiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxMzE5ODM4MiwiZXhwIjoxNzE1NzkwMzgyfQ.hVOeanp--ZtEqEMoPwvaHqnhQ0-7cah41w0DykAVl5Q" ,
              }
            });
            console.log(response.status)
      
            if(response.status==200)
            {
                const json = await response.json();
                if(json.message=="Deleted request successfully")
                {
                  console.log("delete success");
                  props.Delete(props.Id);
                }
             
            }
            else
            {
                console.log("error"+response.statusText);
              
            }
          } catch (error) {
            console.error(error);
          } finally {
            
          }
    }
    const handlePressDecline= async ()=>{
        deleteRequest(); 
    }
    const handlePressAccept= async ()=>{
       if( await createChat(props.SenderId,props.MyId));
        await deleteRequest();
    }
    const moment = require('moment');
    const dateTime = moment(props.Time).format('DD/MM/YYYY HH:mm');

    if(props.Type !='Request')
    return(
        <View style={styles.RequestContainer} >
            <View style={styles.AvatarContainer}>
                    <Image source={{uri: props.Avatar}}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>{props.Time}</Text>
                {/* Tên+ thông báo */}
                <Text> 
                    <Text style={styles.Name}>{props.Name}</Text>
                    <Text style={styles.Content}> acepted your friend request!</Text>
                </Text>
                {/* xem profile */}
                <TouchableOpacity style={styles.ButtonContainer}>
                    <Text style={styles.Button}>See profile</Text>
                </TouchableOpacity>



            </View>
        </View>
    )
    else
    return(
        <View style={styles.RequestContainer} >
            <View style={styles.AvatarContainer}>
                    <Image source={{uri: props.Avatar}}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>{dateTime}</Text>
                {/* Tên+ thông báo */}
                <Text> 
                    <Text style={styles.Name}>{props.Name}</Text>
                    <Text style={styles.Content}> wants to be your friend!</Text>
                </Text>
                {/* xem profile */}
                <View style={styles.Response}>
                    <TouchableOpacity style={styles.ButtonContainer2}>
                        <Text onPress={handlePressAccept} style={[styles.Button,{color:'#27D785'}]}>Accept</Text>                   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressDecline} style={[styles.ButtonContainer2,{marginLeft:10}]}>
                        <Text style={[styles.Button,{color:'#F55247'}]}>Decline</Text>                   
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    
}
export default Request;