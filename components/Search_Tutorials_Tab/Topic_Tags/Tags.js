import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles';
import axios from 'axios';
import { Result } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TagsButton extends Component {
    
    render (){
        return (
        <TouchableOpacity onPress={this.handleOnPress}  style={styles.button}>
            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode='tail'>{this.props.name}</Text>
        </TouchableOpacity>
        )
    };


    handleOnPress = async()=>{
        const refreshtoken = await AsyncStorage.getItem('refreshtoken');
        const accessToken = CheckRefreshToken(refreshtoken);
        const getUser = axios.get('https://se346-skillexchangebe.onrender.com'+'/api/v1/user/find/topic?topics'+this.props.name,
        {headers: {
            Authorization: `Bearer ${accessToken}`
          }})
        .then(response =>{
            if(response.status == 401) alert('Invalid Request')
        })
        .then(result =>{
            if (Object.keys(result).length === 0 && result.constructor === Object) {
                throw new Error('Result is empty');
            }
            else{
                const users = result.data.users
                this.navigateToUserScreen(users)
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        })
        
    }
    
};
const navigateToUserScreen = (users) => {
    // Thực hiện chuyển hướng đến màn hình (hoặc component) chứa người dùng
    // Điều này có thể bao gồm việc hiển thị danh sách người dùng trên giao diện người dùng, hoặc chuyển hướng đến một màn hình (hoặc component) khác, tùy thuộc vào cách bạn tổ chức ứng dụng của bạn
    console.log("Navigating to user screen with users:", users);
    // Ví dụ: navigation.navigate('UserScreen', { users: users });
  };

export default TagsButton;