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


class Category extends Component{
    render() {
        return(
            <TouchableOpacity  onPress={()=> { 
                const navigation = useNavigation();
                navigation.navigate('home');}} 
            activeOpacity={0.8}  // Đặt độ trong suốt khi nhấn
            style={{ height: 230, width: 230, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
            <View style = {{height:230, width: 230, marginLeft: 20, 
            borderWidth: 0.5, borderColor: '#dddddd'}}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = { styles.backgroundImage} source={this.props.imageUri}>
                        <Text style ={styles.fixToImage} numberOfLines={1} ellipsizeMode='tail'>{this.props.name}</Text>
                    </ImageBackground>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

export default Category;

