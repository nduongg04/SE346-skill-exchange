import GradienLayout from "../register/TemplateLayout/GradientLayout";
import { Text, View, Image, TouchableOpacity, Modal   } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../register/style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import InputText from "../register/Button/InputText";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../register/Button/CustomButton";
import Policy from "../register/Policy";
import Notification from "../common/Notification";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { isLoading } from "expo-font";
class Login extends React.Component {
  state = {
    email: null,
    password: null,
    errorEmail: null,
    errorPassword: null,
    showPolicy: false,
    showMessage: false,
    user: null,
    username: null,
    isLoading: false
  }
  handleLogIn = async () => {
    if(this.state.email === null || this.state.email === '') {
      this.setState({errorEmail: 'Email is required'});
    }
    else   
    if(this.state.password === null || this.state.password === '') {
      this.setState({errorPassword: 'Password is required'});
    }
    else
      {
        this.setState({isLoading: true});
        try{
          const response = await Promise.race([
            fetch('https://se346-skillexchangebe.onrender.com/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), 30000)
            )
          ]);
          if(response.status == 401){
            alert('Wrong email or password');
          }
          else
          if(response.status == 404){
            alert('User not found');
          }
          else{
            const json = await response.json();
            this.setState({user: json.data}); 
            console.log(JSON.stringify(json));
            try{
              await AsyncStorage.setItem('user', JSON.stringify(json.data));
              await AsyncStorage.setItem('accessToken', json.access_token);
              await AsyncStorage.setItem('refreshToken', json.refresh_token);
            } catch(error){
              alert('Store token failed!');
            }

            this.setState({username: json.data.username});
            this.setState({showMessage: true});
          }         
        }
        catch(error){
          console.log(error);
          alert('Something went wrong! Please try again!');
        }
        finally{
          this.setState({isLoading: false});
        }
      }
    
  }
  tooglePolicy = () => {
    this.setState({showPolicy: !this.state.showPolicy});
  }
  render() {
    return (
      <GradienLayout innerStyle={{height: scale(600)}}>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: COLORS.lightWhite}}/>
        <Image
          source={require('../../assets/images/teamwork.png')}
          style={styles.image}/>
        <Text
          style={{
              fontSize: 19, 
              color: COLORS.orange,
              marginTop: 10,
              alignSelf: 'center',
              fontFamily: 'Coda-Regular'      
          }}>Welcome</Text >
        <Text style={[styles.termText]}>By signing in you are agreeing our</Text>
        <TouchableOpacity onPress={()=>this.tooglePolicy()}>
          <Text style={[styles.termText, {color: COLORS.orange, textDecorationLine: 'underline'}]}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <ScrollView style={{marginTop: 10}}>
        <InputText 
          placeholder='Enter your email address'
          label='Email'
          iconName='mail'
          error={this.state.errorEmail}
          onFocus={()=>this.setState({errorEmail: null})}
          onChangeText={(text)=>this.setState({email: text})}/>
        <InputText 
          placeholder='Enter your password'
          label='Password'
          error={this.state.errorPassword}
          onFocus={()=>this.setState({errorPassword: null})}
          password={true}
          iconName='lock'
          onChangeText={(text)=>this.setState({password: text})}/>
        </ScrollView>
        <TouchableOpacity 
          style={{width: scale(120), alignSelf: 'flex-end'}}
          onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
          <Text 
            style={{
              color: COLORS.orange, 
              alignSelf: 'flex-end', 
              marginRight: 20, 
              marginTop: 10, 
              fontFamily: 'AbhayaLibre-Regular',
              fontSize: scale(10)}}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <CustomButton 
            text={'Login'}
            onPress={()=>this.handleLogIn()}
            style={{backgroundColor: COLORS.orange, 
                  borderColor: COLORS.orange,
                  height: scale(35),
                  width: "40%"}}
            textStyle={{color: COLORS.lightWhite}}/>
          <CustomButton 
            margin={false}
            textColor={COLORS.orange}
            text={'Register'}
            onPress={()=>this.props.navigation.navigate('EnterName')}
            style={{backgroundColor: COLORS.white,
                borderColor: COLORS.orange,
                borderWidth: 0.5,
                  height: scale(35),
                  width: '40%',}}
            textStyle={{color: COLORS.white}}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <Text style={{fontFamily: 'AbhayaLibre-Regular', fontSize: scale(10)}}>Or sign in with</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
          <TouchableOpacity style={{margin: 5}}>
            <Image source={require('../../assets/images/googleIcon.png')} style={{width: 30, height: 30}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 5}}>
            <Image source={require('../../assets/images/facebookIcon.png')} style={{width: 30, height: 30}}/>
          </TouchableOpacity>
        </View>
        <Modal 
          transparent={true}
          visible={this.state.showPolicy}
          onRequestClose={()=>this.tooglePolicy()}>
            <Policy onPress={() =>this.tooglePolicy()}></Policy>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.showMessage}>
          <Notification
            text={ 'Welcome ' + this.state.username}
            iconName={'check-circle'}
            iconColor={COLORS.green}
            buttonColor={COLORS.skyBlue}
            onPress={()=>this.setState({showMessage: false}) }/>
          </Modal>
      </GradienLayout>
    );
  }
}
export default Login;