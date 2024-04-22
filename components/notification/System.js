import React from 'react'
import { View,Text,Image,TouchableOpacity,Button } from 'react-native'
import {loadFonts,styles} from "./notification.style";
import { icons } from "@constants";
const System=(props)=>
{
    if(props.Type=='Request')
    return(
        <View style={[styles.RequestContainer,{height:70}]} >
            <View style={styles.AvatarContainer}>
                    <Image source={icons.app}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>16 Apr 2024 - 22:13</Text>
                {/* Tên+ thông báo */}
                <Text> 
                    <Text style={styles.Name}>New update version 2.0</Text>
                </Text>
          
            </View>
        </View>
    )
    
}
export default System;