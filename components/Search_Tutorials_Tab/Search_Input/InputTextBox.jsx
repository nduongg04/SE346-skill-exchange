import React, { useState } from 'react';
import InputText from "../../register/Button/InputText";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputTextBox = () => {
  const [query, setQuery] = useState("");

  const handleOnChangeText = (text) => {
    setQuery(text);
    getuser();
  };

  const getuser = async () => {
    const refreshtoken = await AsyncStorage.getItem('refreshtoken');
    const accessToken = CheckRefreshToken(refreshtoken);
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
        onSubmitEditing={getuser} // Thêm hàm xử lý sự kiện onSubmitEditing
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