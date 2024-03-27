import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { CircleButton } from '../components';
import { Dimensions } from "react-native";
import { COLORS, icons } from "../constants";
import { Stack } from "expo-router";
import Category from './Category/Category';
import Data from './Data_Topic_List';
import Topic_List from './Topic_List';
import Topic_Remarkable_List from './Topic_Remarkable_List';


const Search_Tutorial_Tab = () => {
  const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
  const backButtonSize = (screenWidth / 100) * 18;

  return(
    <SafeAreaView style = {{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen options={{ headerStyle: { backgroundColor: COLORS.lightWhite },headerShadowVisible: false,headerLeft: () => (
            <ScreenHeaderBtn
                iconUrl={favicon}
                dimension={40}
              string="SkillExchange"
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView scrollEventThrottle ={16}>
          <View style ={{ flex: 1, backgroundColor: COLORS.lightWhite, paddingTop: 20 }}>
            <View style ={{height: 220, marginTop: 30}}>
              <Topic_List/>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20,fontWeight:"700"}}>Remarkable Issue</Text>
              <Text>__________________________</Text>
            </View>
            <View>
              <Topic_Remarkable_List/>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
    
  )

};

export default Search_Tutorial_Tab;