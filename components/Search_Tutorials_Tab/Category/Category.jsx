import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import axios from 'axios';
import { Result } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../../../utils/checkrefreshtoken';

class Category extends Component{
    state = {
        data: [],
    };

    async handleOnPress() {
        const refreshtoken = await AsyncStorage.getItem('refreshtoken');
        const accessToken = await CheckRefreshToken(refreshtoken);
        const bareUrl = "https://se346-skillexchangebe.onrender.com";
        const response = await axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${bareUrl}/api/v1/user/find/topic?topics=${this.props.name}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        this.setState({ data: response.data });
        if(response.status == 200) {
            console.log(this.state.data);
        }
    }

    render() {
        return(
            <TouchableOpacity
            activeOpacity={0.8} onPress={() => this.handleOnPress()}
            style={{ height: 200, width: 200, marginLeft: 5, marginBottom: 5, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20  }}>
                <View style = {{height:200, width: 200, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20,  overflow: 'hidden' }}>
                    <View style ={{flex: 2, }}>
                        <ImageBackground style = {[styles.backgroundImage, {borderRadius: 20}]} source={{ uri: this.props.imageUri }} resizeMode="cover" onError={(error) => console.log(error)}>
                            <Text style ={styles.fixToImage} numberOfLines={1} ellipsizeMode='tail'>{this.props.name}</Text>
                        </ImageBackground>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({ 
    fixToImage: {
    position: 'absolute',
      top: '85%', // Điều chỉnh theo yêu cầu
      textAlign: 'center',
      color: 'white', // Màu văn bản 
      fontSize: 20,
      fontWeight: 'bold',
    },
    backgroundImage: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }
  });
export default Category;