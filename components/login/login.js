import GradienLayout from "../register/TemplateLayout/GradientLayout";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../register/style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import InputText from "../register/Button/InputText";
import CustomButton from "../register/Button/CustomButton";
import { AntDesign } from "@expo/vector-icons";
class Login extends React.Component {
  state = {
    email: null,
    password: null
  }
  render() {
    return (
      <GradienLayout innerStyle={{height: scale(550)}}>
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
          }}
          >Welcome</Text >
        <Text style={[styles.termText]}>By signing up you are agreeing our</Text>
        <TouchableOpacity onPress={()=>this.tooglePolicy()}>
          <Text style={[styles.termText, {color: COLORS.orange, textDecorationLine: 'underline'}]}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <InputText 
          placeholder='Enter your email address'
          label='Email'
          iconName='mail'
          error="Input email"
          onChangeText={(text)=>this.setState({email: text})}/>
        <InputText 
          placeholder='Enter your password'
          label='Password'
          password={true}
          iconName='lock'
          error="Input password"
          onChangeText={(text)=>this.setState({password: text})}/>
      </GradienLayout>
    );
  }
}
export default Login;