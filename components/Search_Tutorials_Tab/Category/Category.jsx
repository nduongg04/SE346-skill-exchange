import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {styles} from './Topic_category_style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import navigateToUserScreen from '../navigateToUserScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Category extends Component{
    handleOnPress = async ()=>{
        const accessToken = await AsyncStorage.getItem('accessToken');
        const getUser = axios.get('https://se346-skillexchangebe.onrender.com'+'/api/v1/user/find/topic?topics'+$this.props.name,
        {headers: {
            Authorization: 'Bearer'+ accessToken
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
                navigateToUserScreen(users)
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        })
    }
    render() {
        return(
            <TouchableOpacity  onPress= {this.handleOnPress}
            activeOpacity={0.8}  // Đặt độ trong suốt khi nhấn
            style={{ height: 230, width: 230, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
            <View id={this.props._id} style = {{height:230, width: 230, marginLeft: 20, 
            borderWidth: 0.5, borderColor: '#dddddd'}}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = { styles.backgroundImage} source={this.props.imageUrl}>
                        <Text style ={styles.fixToImage} numberOfLines={1} ellipsizeMode='tail'>{this.props.name}</Text>
                    </ImageBackground>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

export default Category;

