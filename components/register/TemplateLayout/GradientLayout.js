import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import { Scale, VerticalScale } from 'react-native-size-matters';
import React from 'react';
import styles from '../style';
class GradienLayout extends React.Component {
    render(){
        return (
            <LinearGradient
                style={{...styles.container, ...this.props.style}}
                colors={["#FFBE98", "#7751C7"]}
                >
                <SafeAreaView style={[styles.floating, this.props.innerStyle]}>      
                    {this.props.children}           
                </SafeAreaView>
            </LinearGradient>
        );
    }
}
export default GradienLayout;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
