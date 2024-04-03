import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('../../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf')
  });
};

export const styles = StyleSheet.create(
{
    //Main
    Container:
    {
        justifyContent: 'center',
        alignItems:'center',
        height:'100%'
    },
    Header:
    {
        height:54,
        width:'90%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:'9%'
    },
    Name:
    {
        fontFamily:'Inter-SemiBold',
        fontSize:23.5,
        flex:1,
        textAlign:'center',
        marginLeft:29
    },
    Scrool:
    {
        flex:1,
    },
    
    Bottom:
    {
        height:60,
        width:'90%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    Input:{
    //    width:'90%',
        flex:1,
        borderWidth:1,
        borderRadius:25,
        paddingHorizontal:10,
        borderColor:'#E6E6E6',
        padding:5,
     
    },
    RecordContainer:{
        flex:1,
        borderWidth:1,
        borderRadius:25,
        paddingHorizontal:10,
        borderColor:'#E6E6E6',
        flexDirection:'row',
        padding:5,
    },
    TimeRecord:{
        marginLeft:7,
        fontSize:15,
        color:'#FFBE98'
    },

    //Message
    Layout:{    
        marginLeft: '32%',
    },
    MessContainer:{
        flexDirection:'row',
        marginTop:0,             
    },
    Message:{
        backgroundColor:"#FFBE98",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:2,
        padding:12,
       maxWidth:200,
       fontFamily:'Inter-Regular',
       fontSize:14,
       marginTop:10,
       marginRight:10
        
    },
    AvatarContainer:
    {
        borderRadius: 30,
        borderWidth:1.5,
        marginLeft:0,
        width:36,
        height:36,
        overflow: 'hidden',
        borderColor:"black",
        marginTop:'auto'
        

    },
    Avatar:{
        width:'100%',
        height: '100%', 
        resizeMode:'cover'
    },
    Time:{
        marginLeft:5,
        marginTop:1,
        fontSize:12
    },
    Message2:{
        backgroundColor:"#F2F2F2",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:2,
        borderBottomRightRadius:15,
        padding:12,
       maxWidth:200,
       fontFamily:'Inter-Regular',
       fontSize:14,
       marginTop:10,
       marginLeft:10
        
    },
    Time2:{
        marginLeft:212,
        marginTop:1,
        fontSize:12
    },
    Layout2:{    
        marginLeft: '2%',
    },
    
    
})