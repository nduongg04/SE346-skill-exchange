import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles'

const TagsButton = ({title }) => {
    return (
        <TouchableOpacity onPress={()=> { 
            const navigation = navigation();
            navigation.navigate('home');}}  style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};


export default TagsButton;