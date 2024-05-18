import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { scale } from "react-native-size-matters";
import axios from "axios";
import Autocomplete from 'react-native-autocomplete-input';
import { COLORS } from "../../../constants";
import { router } from "expo-router";
import InputText from "../../register/Button/InputText";

const InputTextBox = () => {
  const bareUrl = "https://se346-skillexchangebe.onrender.com";
  const [query, setQuery] = useState("");
  const [topicdata, setTopicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (query) {
      setFilteredData(topicdata.filter(topic => topic.name.includes(query)));
    } else {
      setFilteredData([]);
    }
  }, [query]);

  useEffect(()=>{
    getTopicData();
  },[]);

  const handleOnChangeText = (text) => {
    setQuery(text);
  };
  const handleOnBlur= () => {
    setFilteredData([]);
  };

  const handleonFocus=() =>{
    if (query) {
      setFilteredData(topicdata.filter(topic => topic.name.includes(query)));
    } else {
      setFilteredData([]);
    }
  }
  const getTopicData = async () =>{
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${bareUrl}/api/v1/topic/find`,
        headers: {}
      });
    
      if (response.status === 200) {
        setTopicData(response.data.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
      console.error(error);
    }
  }
  
  const getTopic = async () => { 
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
          setTopicData([]);
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

  const handleSelectTopic = (topic) => {
    router.push({
      pathname: "/result/[id]",
      params: {
        data: topic,
      },
    });
    setQuery("");
  };


  return (
    <SafeAreaView>
      <InputText
        placeholder="Enter your topic"
        label="Enter your query"
        onChangeText={handleOnChangeText}
        onFocus={handleonFocus}
        onBlur = {handleOnBlur}
        onSubmitEditing={getTopic}
        value={query}
        style={{ marginTop: 20 }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{marginLeft: 20, marginBottom: 3,zIndex: 1}} onPress={() => handleSelectTopic(item.name)}>
            <Text style ={styles.TopicText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={{ position: 'relative', top: 0, left: 0, right: 0, zIndex: 1 }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  TopicText: {
      fontSize: scale(12),
      textAlign:'left',
      fontFamily: 'Coda-Regular',
      color: COLORS.black,
  },
});
export default InputTextBox;