import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles';
import { render } from 'react-dom';

class TagsButton extends Component {
    render (){
        return (
        <TouchableOpacity onPress={()=> { 
            const navigation = navigation();
            navigation.navigate('home');}}  style={styles.button}>
            <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableOpacity>
        )
    };
};


export default TagsButton;