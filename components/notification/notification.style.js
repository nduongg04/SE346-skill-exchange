import { StyleSheet } from "react-native";

import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf')
  });
};

export const styles= StyleSheet.create({
    Container:{
        justifyContent: 'center',
        alignItems:'center',

    },
    Header:{
        marginTop:"11%",
        textAlign:'center',
        fontFamily:'Inter-SemiBold',
        fontSize: 22,
       
    },
    Search:{
        height:25,
        aspectRatio:4.8/1,
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:12,
        flexDirection:'row',       
    },
    Choose:
    {
        borderBottomWidth:1,
        borderBottomColor:'#FFBE98',
        color:'#FFBE98',
    },
    Option:
    {
        fontSize:13,
        fontFamily:'Inter-SemiBold',
        
        padding:2,
        
       
    },
    RequestContainer:
    {

        paddingHorizontal:'5%',
        paddingTop:'3%',
        height:100,
        flexDirection:'row',
        width:'96%',
        backgroundColor:'rgba(255, 190, 152, 0.11)',
        marginTop:3,
        borderRadius:12,
        marginLeft:'2%'
    
        
        
    },
    AvatarContainer:
    {
        borderRadius: 20,
        width:27,
        height:27,
        overflow: 'hidden',
        marginTop:5

    },
    Avatar:{
        width:'100%',
        height: '100%', 
        resizeMode:'cover'
    },

    ButtonContainer:
    {
        width:110,
        height:32,
        borderWidth:1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#E6E6E6',
        borderRadius:7,
        marginTop:7

    },
    ButtonContainer2:
    {
        width:90,
        height:32,
        borderWidth:1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#E6E6E6',
        borderRadius:7,
        marginTop:7

    },
    Button:{
        fontSize:15.9,
        fontFamily:'Inter-SemiBold',
        color:'#FFBE98'
    },
    ContentContainer:
    {
        marginLeft:12
    },
    Time:{
        fontFamily:'Inter-Regular',
        fontSize:13.65,
        color:'#999999',
    },
    Name:
    {
        fontFamily:'Inter-SemiBold',
        fontSize:13.65
    },
    Content:{
        fontFamily:'Inter-Regular',
        fontSize:13.65,
        color:'#666666',
    },
    Scroll:{
        // width:'100%',
        // height:620,
        flex:1,
        
    },
    
    navbar:{
        height:90
    },
    Horizon:{
        height:'100%'
    },
    Response:{
        flexDirection:'row',       
    }




})
