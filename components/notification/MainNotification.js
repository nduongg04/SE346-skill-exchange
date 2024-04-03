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
  const [isPress, setPress] = useState(false);
  const[requests, setRequest]= useState([]);
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
      const json = await response.json();
      setRequest(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser= async () =>{
    for (const user of requests) 
      {
        try {
          const response = await fetch('http://localhost:3000/api/v1/request/find/reciever/${user.senderID}',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          const json = await response.json();
          listUser.push(json);
        } catch (error) {
          console.error(error);
        } 
      }
  }
  useEffect(() => {
    getRequest();
    getUser();
  }, []);

  // const postData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/v1/request/create', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer 123`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "senderID": "1234",
  //         "receiverID": "123456"
  //       }),
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  

  
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
    if(isPress==true)
    setPress(!isPress);
    // postData();
  }
  const handelPress2 = () => {
    if(isPress==false)
    setPress(!isPress);
  }








  return (
    <View style={styles.Horizon} >
      <View style={styles.Container}>
        <Text style={styles.Header}>Notification</Text>
        <View style={styles.Search}>
          <TouchableOpacity onPress={handelPress}>
            <Text style={[styles.Option, !isPress && styles.Choose]}>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handelPress2}>
            <Text style={[styles.Option, isPress && styles.Choose]}>System</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.Scroll}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={listUser}
          keyExtractor={({id}) => ID}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View> */}
      <View style={styles.Scroll} >
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
      </View>
      <View style={styles.navbar}>

      </View>

    </View>
  );

}
export default ScreenNotification;
registerRootComponent(ScreenNotification);