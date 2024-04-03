import React from 'react'
import { View,Text,Image,TouchableOpacity,Button } from 'react-native'
import {loadFonts,styles} from "./notification.style";
const Request=(props)=>
{
    if(props.Type=='Request')
    return(
        <View style={styles.RequestContainer} >
            <View style={styles.AvatarContainer}>
                    <Image source={require('../message/test/rem2.png')}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>16 Apr 2024 - 22:13</Text>
                {/* Tên+ thông báo */}
                <Text> 
                    <Text style={styles.Name}>Rem</Text>
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
                    <Image source={require('../message/test/rem2.png')}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>16 Apr 2024 - 22:13</Text>
                {/* Tên+ thông báo */}
                <Text> 
                    <Text style={styles.Name}>Rem</Text>
                    <Text style={styles.Content}> wants to be your friend!</Text>
                </Text>
                {/* xem profile */}
                <View style={styles.Response}>
                    <TouchableOpacity style={styles.ButtonContainer2}>
                        <Text style={[styles.Button,{color:'#27D785'}]}>Accept</Text>                   
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.ButtonContainer2,{marginLeft:10}]}>
                        <Text style={[styles.Button,{color:'#F55247'}]}>Decline</Text>                   
                    </TouchableOpacity>
                </View>
                



            </View>
        </View>
    )
    
}
export default Request;