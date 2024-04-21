import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import * as Font from 'expo-font';
import customFonts from '../useFonts'
import {COLORS} from '../../constants'
import React from 'react';
import styles from './style';
import InputText from './Button/InputText';
import CustomButton from './Button/CustomButton';
import GradienLayout from './TemplateLayout/GradientLayout';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class EnterName extends React.Component {
    state = {
        fontsLoaded: false,
        name: '',
        nameError: null, 
        isLoading: false
    }   
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        await Font.loadAsync(
            'antoutline',
            require('@ant-design/icons-react-native/fonts/antoutline.ttf')
          );
        await Font.loadAsync(
            'antfill',
            require('@ant-design/icons-react-native/fonts/antfill.ttf')
        );
        this.setState({ fontsLoaded: true });
      }
    checkValidName = (name) => {
        if(name === null || name === '') {
            this.setState({nameError: 'Name is required'});
            return false;
        }
        else {
            const specialCharsRegex = /[^a-zA-Z0-9\sÀ-ỹ]/;
            if(specialCharsRegex.test(name)){
                this.setState({nameError: `Name shouldn't contain special characters`});
                return false;
            }
            else{
                this.setState({nameError: null});
                return true;
            }
        }
    }
    componentDidMount = async () => {
        this._loadFontsAsync();
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            console.log('refreshToken: ' + refreshToken);
            this.setState({isLoading: true});
            if(refreshToken !== null){
                const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/token/checktoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: refreshToken
                    })
                });
                const user = await AsyncStorage.getItem('user');
                if(response.ok){
                    alert('You are already logged in, user: ' + user );
                    //Di chuyển đến trang home
                    //this.props.navigation.navigate('Home');
                 }
            }  
        } catch (e) {
            console.log('Failed to fetch the refresh token');
        }
        finally {
            this.setState({isLoading: false});
        }
      }
    render(){
        if (!this.state.fontsLoaded) {
            return null;
          }
        const params = {
            name: this.state.name.trim()
        }
        return (
            <GradienLayout innerStyle={{height: scale(500)}}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Connecting to server...'}
                    textStyle={{color: COLORS.lightWhite}}/>
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
                    <InputText
                        placeholder='Enter your name'
                        label={null}
                        error={(this.state.nameError)}
                        onFocus={()=>this.setState({nameError: null})}
                        iconName='user'
                        onChangeText={(text)=>{this.setState({name: text})
                    
                    }}
                        />
                    <CustomButton 
                        text='Next' 
                        onPress={()=>{
                            if(this.checkValidName(this.state.name))
                                this.props.navigation.navigate('UploadPhoto', params)
                        }}
                        />
                    <View style={{flex: 1, flexDirection: 'row', 
                                marginTop: 20, 
                                justifyContent: 'space-around',
                                paddingHorizontal: 25,
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
