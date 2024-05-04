import React, { useState } from 'react';
import InputText from "../../register/Button/InputText";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../../../utils/checkrefreshtoken';
const InputTextBox = () => {
  const [query, setQuery] = useState("");

  const handleOnChangeText = (text) => {
    setQuery(text);
  };

  const getuser = async () => {
    const refreshtoken = await AsyncStorage.getItem('refreshtoken');
    const accessToken = await CheckRefreshToken(refreshtoken); // Add await here
    const bareUrl = "https://se346-skillexchangebe.onrender.com";
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${bareUrl}/api/v1/user/find/topic?topics=${query}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    
      if (response.status === 200) {
        const users = response.data.users;
        Alert.alert("Success", "We get it!");
        navigateToUserScreen(users);
      } else {
        Alert.alert("Error", "Failed to fetch users. Please try again later.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
      console.error(error);
    }
  };

  const navigateToUserScreen = (users) => {
    console.log("Navigating to user screen with users:", users);
  };

  return (
    <SafeAreaView>
      <InputText
        placeholder="Enter your topic"
        label="Enter your query"
        onChangeText={handleOnChangeText}
        onSubmitEditing={getuser} // Call getuser when the user submits the input
        value={query}
        style={{ marginTop: 20 }}
      />
      <TouchableOpacity onPress={getuser}>
        <Image
          source={require("@assets/icons/search.svg")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InputTextBox;