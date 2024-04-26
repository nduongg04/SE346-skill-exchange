import React, { useState } from 'react';
import InputText from "../../register/Button/InputText";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputTextBox = () => {
  const [query, setQuery] = useState("");

  const handleOnChangeText = (text) => {
    setQuery(text);
  };

  const getuser = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        "https://se346-skillexchangebe.onrender.com/api/v1/user/find/topic?topics=" + query,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken, // Thay YOUR_TOKEN bằng token thực tế của bạn
          }
        }
      );

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
        iconName="search"
        onChangeText={handleOnChangeText}
        onBlur={getuser}
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