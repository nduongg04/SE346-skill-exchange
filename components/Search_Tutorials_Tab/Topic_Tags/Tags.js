import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles';
import { render } from 'react-dom';
import axios from 'axios';

class TagsButton extends Component {
    
    render (){
        return (
        <TouchableOpacity onPress={this.handleOnPress}  style={styles.button}>
            <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableOpacity>
        )
    };
    handleOnPress = async()=>{
        
    }
};


export default TagsButton;