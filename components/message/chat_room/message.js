import React, { useState, useEffect } from 'react';
import { View,Text,ScrollView,TouchableOpacity,Image,TouchableHighligh,TextInput } from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import {loadFonts,styles} from "./mainRoom.style";

export const Message= (props) =>{
    if(props.User=="My message")
    {
    return (
        <View style={styles.Layout} >
            <View style={styles.MessContainer}>
                <Text  style={styles.Message}> {props.Text}</Text>
                <View style={styles.AvatarContainer}>
                    <Image source={(props.Avatar=='')?(icons.while_icon):({url: props.Avatar})}
                            style={styles.Avatar}/>
                </View>
            </View>
            <Text style={styles.Time}>{props.time}</Text>
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
                <Text  style={styles.Message2}> helllo helllo v vvhelllo helllohelllohelllohelllohelllo</Text>
            </View>
            <Text style={styles.Time2}>
                6:20
            </Text>
        </View>
    )
    }
   
}