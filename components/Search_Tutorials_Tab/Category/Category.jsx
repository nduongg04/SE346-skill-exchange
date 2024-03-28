import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {styles} from '../Topic_tags_style';

class Category extends Component{
    render() {
        return(
            <View style = {{height:230, width: 230, marginLeft: 20, 
            borderWidth: 0.5, borderColor: '#dddddd'}}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = { styles.backgroundImage} source={this.props.imageUri}>
                        <Text style ={styles.fixToImage}>{this.props.name}</Text>
                    </ImageBackground>
                </View>
                    
            </View>
        )
    }
}

export default Category;

