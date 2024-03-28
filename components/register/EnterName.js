import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import * as Font from 'expo-font';
import customFonts from '../useFonts'
import {COLORS} from '../../constants'
import React from 'react';
import styles from './style';
import CustomButton from './Button/CustomButton';
import GradienLayout from './TemplateLayout/GradientLayout';
export default class EnterName extends React.Component {
    state = {
        fontsLoaded: false,
        name: ''
    }   
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
    componentDidMount() {
        this._loadFontsAsync();
      }
    render(){
        if (!this.state.fontsLoaded) {
            return null;
          }
        const params = {
            name: this.state.name
        }
        return (
            <GradienLayout>
                <Image
                        source={require('../../assets/images/teamwork.png')}
                        style={styles.image}
                        />
                    <Text
                        style={{
                            fontSize: 19, 
                            color: COLORS.orange,
                            marginTop: 15,
                            marginBottom: 15,
                            alignSelf: 'center',
                            fontFamily: 'Coda-Regular'      
                        }}
                        >
                        Welcome
                    </Text >
                    <Text style={styles.text_center}>
                        LEARN a new skill                   
                    </Text>
                    <Text style={styles.text_center}>
                        GET a new friend
                    </Text>
                    <View 
                        style={{
                            height: 4, 
                            backgroundColor: COLORS.purple, 
                            borderRadius: 50,
                            width: 120,
                            alignSelf: 'center',
                            margin: 15 }}></View>
                    <Text
                        style={{
                            fontSize: 17, 
                            color: COLORS.orange,
                            marginBottom: 15,
                            alignSelf: 'center',
                            fontFamily: 'Coda-Regular'      
                        }}
                        >Register</Text >
                    <TextInput
                        style={{height: 45, 
                                borderRadius: 30, 
                                width: scale(265),
                                alignSelf: 'center', 
                                borderColor: COLORS.black,
                                borderWidth: 0.5, 
                                backgroundColor: COLORS.lightGray,
                                paddingLeft: 30, 
                                fontSize: 14, 
                                fontFamily: 'Coda-Regular'                       
                            }}
                        onChangeText={(text) => this.setState({name: text})}
                        value={this.state.name}
                        placeholder="Your name">
                    </TextInput>
                    <CustomButton 
                        text='Next' 
                        onPress={()=>this.props.navigation.navigate('UploadPhoto', params)}
                        />
                    <View style={{flex: 1, flexDirection: 'row', 
                                marginTop: 20, 
                                justifyContent: 'space-around',
                                paddingHorizontal: 30,
                                }}>
                        <Text 
                            style={{
                                fontFamily: 'Coda-Regular',
                                fontSize: 14, marginTop: 5                     
                            }}>Already have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Login')} 
                            style={[{
                                borderRadius: 25,
                                width: 80, height: 33,
                                justifyContent: 'center',
                                backgroundColor: COLORS.lightWhite, 
                                borderColor: COLORS.orange,
                                borderWidth: 0.5}]}>
                            <Text 
                                style={[styles.buttonText,{color: COLORS.orange}]}>Login</Text>
                        </TouchableOpacity>
                    </View>
            </GradienLayout>
        );
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
