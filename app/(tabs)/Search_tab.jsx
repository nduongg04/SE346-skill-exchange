import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { CircleButton } from '../../components';
import { Dimensions } from "react-native";
import { COLORS, icons } from "../../constants";
import { Stack } from "expo-router";
import Topic_List from '../../components/Search_Tutorials_Tab/Topic_List';
import Topic_Remarkable_List from '../../components/Search_Tutorials_Tab/Topic_Remarkable_List';
import { Tag } from '@ant-design/react-native';
import TagsButton from '../../components/Search_Tutorials_Tab/Topic_Tags/Tags';
import InputText from '../../components/register/Button/InputText';
import InputTextBox from '../../components/Search_Tutorials_Tab/Search_Input/InputTextBox';

const Search_Tab = () => {
  
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
      <InputTextBox />
      <ScrollView scrollEventThrottle ={16}>
          <View style ={{ flex: 1, backgroundColor: COLORS.lightWhite, paddingTop: 20 }}>
            <View style={{height:220, marginTop: 20}}>
              <Topic_Remarkable_List/>
            </View>
            <View style ={{height: 220, marginTop: 20}}>
              <Topic_List/>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 20,fontWeight:"700"}}>Remarkable Issue</Text>
              <Text>__________________________</Text>
            </View>
            <View>
              <Topic_Remarkable_List />
            </View>
          </View>
      </ScrollView>
      <View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: (screenWidth / 100) * 7,
					}}
				>
					<CircleButton
						iconUrl={icons.cancel}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
						style={{ flex: 1 }}
					/>

					<CircleButton
						iconUrl={icons.backLoading}
						width={backButtonSize - 13}
						height={backButtonSize - 13}
						handlePress={() => {}}
					/>

					<CircleButton
						iconUrl={icons.tickCircle}
						width={backButtonSize}
						height={backButtonSize}
						handlePress={() => {}}
					/>
				</View>
    </SafeAreaView>
    
  )

};

export default Search_Tab;