import { View, Text, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity,FlatList,ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
// import NavBar from "./NavBar";
import { loadFonts, styles } from "./notification.style";
import Request from "./Requests";
import System from "./System";
const ScreenNotification = () => {
  const [isLoading, setLoading] = useState(true);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isRequestTab, setIsRequestTab] = useState(true);
  const[requests, setRequest]= useState([]);
  const[systems, setSystem]=useState([])
  const myId='123';
  const token='1234';
  const listUser=[];

const getRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/request/find/reciever/${myId}',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if(response.status==400)
      {
        alert('Something went wrong');
      }
      else
      {
        const json = await response.json();
        setRequest(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    getRequest();
  }, []);
  
  useEffect(() => {
    const loadFont = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
    loadFont();
  }, []);
  if (!isFontLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }
  const handelPress = () => {
    setIsRequestTab(true);
    // postData();
  }
  const handelPress2 = () => {
    setIsRequestTab(false);
  }








  return (
    <View style={styles.Horizon} >
      <View style={styles.Container}>
        <Text style={styles.Header}>Notification</Text>
        <View style={styles.Search}>
          <TouchableOpacity onPress={handelPress}>
            <Text style={[styles.Option, isRequestTab && styles.Choose]}>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handelPress2}>
            <Text style={[styles.Option, !isRequestTab && styles.Choose]}>System</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Scroll}>
      {isLoading ? (
        <ActivityIndicator />
      ) :(isRequestTab)?
        (
          <FlatList
            data={requests}
            keyExtractor={({id}) => ID}
            renderItem={({item}) => (
              <Request Type="Request" Name={item.senderID.username} Avartar={item.senderID.avartar} Time={item.dateTime} ></Request>
            )}
          />
        ):
        (<FlatList
        data={requests}
        keyExtractor={({id}) => ID}
        renderItem={({item}) => (
          <System></System>
        )}
        />)
      }
    </View>
      {/* <View style={styles.Scroll} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Request Type={'Request'}></Request>
          <Request Type={'Accept'}></Request>
          <System Type={'Request'}></System>
          <Request></Request>
          <Request></Request>
          <Request></Request>
          <Request></Request>
          <Request></Request>
          <Request></Request>
        </ScrollView>
      </View> */}
      <View style={styles.navbar}>

      </View>

    </View>
  );

}
export default ScreenNotification;
registerRootComponent(ScreenNotification);