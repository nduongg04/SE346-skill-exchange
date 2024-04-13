import React, { useState, useEffect } from 'react';
import { View,Text,ScrollView,TouchableOpacity,Image,TouchableHighligh,TextInput } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import {loadFonts,styles} from "./mainRoom.style";

export const Message= (props) =>{
    let contentType;
    switch(props.Type)
    {
        case 'text':
            contentType=<Text  style={styles.Message}> {props.Content}</Text>;
            break;
        case 'image':
            contentType=<View style={{width:150,height:200,borderRadius:20,overflow: 'hidden',}}><Image  style={{width:'100%',height:'100%',resizeMode:"cover"}} source={{uri: props.Content}}/></View>
    }
    if(props.User=="Người gửi")
    {
    return (
        <View style={styles.Layout} >
            <View style={styles.MessContainer}>
                {contentType}
                <View style={styles.AvatarContainer}>
                    <Image source={(props.Avatar=='')?(icons.while_icon):({uri: props.Avatar})}
                            style={styles.Avatar}/>
                </View>
            </View>
            <Text style={styles.Time}>
                6:20
            </Text>
            
            
            
        </View>
    )
    }
    else
    {
    return (
        <View style={styles.Layout2} >
            <View style={styles.MessContainer}>
                <View style={styles.AvatarContainer}>
                    <Image source={require('../test/rem2.png')}
                            style={styles.Avatar}/>
                </View>
                <Text  style={styles.Message2}> helllo helllo v vvhelllo hel</Text>
            </View>
            <Text style={styles.Time2}>
                6:20
            </Text>
        </View>
    )
    }
   
}