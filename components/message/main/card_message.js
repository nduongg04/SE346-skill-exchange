import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import {loadFonts,styles} from "./mainMess.style";

const CardMessage=(props)=>{
    const OnOff = props.Status=="online"?styles.Online:styles.Offline;
    console.log(props.Recent[0])
    if(props.Recent[0])
    {

    }
return(
    <View style={styles.CardContainer}>
        <View style={styles.AvatarContainer}>
            <Image source={(props.Avatar==""||!props.Avatar)?require('assets/images/avatarDefault.jpg'):{uri: ''+props.Avatar}}
            style={styles.Avatar}/>
        </View>
        <View style={styles.MessageContainer}>
            <Text style={styles.Name}>{props.Name}</Text>
            <Text style={styles.RecentMessage}>{props.Recent}</Text>
        </View>
        <View style={styles.StatusContainer}>
            <View style={[styles.Status,OnOff]}></View>
            

        </View>
    </View>
    
);
}
export default CardMessage;