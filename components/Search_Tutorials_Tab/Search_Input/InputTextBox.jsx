import React, { useState } from 'react';
import InputText from "../../register/Button/InputText";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { router } from "expo-router";
const InputTextBox = () => {
  const [query, setQuery] = useState("");
  const handleOnChangeText = (text) => {
    setQuery(text);
  };
  const getuser = async () => {
    const bareUrl = "https://se346-skillexchangebe.onrender.com";
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${bareUrl}/api/v1/topic/find`,
        headers: {}
      });
    
      if (response.status === 200) {
        const data = response.data.data;
        const isQueryInData = data.some(topic => topic.name === query);
        if (isQueryInData) {
          router.push({
            pathname: "/result/[id]",
            params: {
              data: query,
            },
          });
          setQuery("");
        } else {
          // If query is not in data, show an alert
          Alert.alert("Error", "Topic not found. Please try again.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
      console.error(error);
    }
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