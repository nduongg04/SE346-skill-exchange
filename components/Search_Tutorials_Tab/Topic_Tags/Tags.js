import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles'

const TagsButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};


export default TagsButton;