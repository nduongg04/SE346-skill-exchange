import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import axios from 'axios';
import { Result } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../../../utils/checkrefreshtoken';
const handleOnPress = async (name)=>{
    const refreshtoken = await AsyncStorage.getItem('refreshtoken');
    const accessToken = await CheckRefreshToken(refreshtoken); // Add await here
    const bareUrl = "https://se346-skillexchangebe.onrender.com";
    axios.get(`${bareUrl}/api/v1/user/find/topic?topics=${name}`,
    {headers: {
        Authorization: `Bearer ${accessToken}`,
      }})
    .then(result =>{
        if (Object.keys(result.data).length === 0 && result.data.constructor === Object) {
            throw new Error('Result is empty');
        }
        else{
            const users = result.data.users
           // navigateToUserScreen(users)
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    })
}

class Category extends Component{
    render() {
        return(
            <TouchableOpacity  onPress= {() => handleOnPress(this.props.name)}
            activeOpacity={0.8}  // Đặt độ trong suốt khi nhấn
            style={{ height: 75, width: 75, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
            <View id={this.props._id} style = {{height:75, width: 75, marginLeft: 20, 
            borderWidth: 0.5, borderColor: '#dddddd'}}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = { styles.backgroundImage} source={{ uri: this.props.imageUrl }}>
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
      width: 75,
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }
  });
export default Category;