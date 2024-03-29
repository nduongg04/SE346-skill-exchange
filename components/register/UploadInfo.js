import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, Modal, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
import InputText from "./Button/InputText";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Policy from "./Policy";
class ChooseTopic extends React.Component {
  state = {
      password: null,
      confirmPassword: null,
      phoneNumber: null,
      email: null,
      birthDay: null,
      date: new Date(),
      showPicker: false,
      showPolicy: false,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      phoneNumberError: null,
      birthDayError: null,
      loading: false,
    }
  tooglePicker = () => {
    this.setState({showPicker: !this.state.showPicker});
  }
  tooglePolicy = () => {
    this.setState({showPolicy: !this.state.showPolicy});
  }
  onDateChange = ({type}, selectedDate) => {
      this.tooglePicker();
      const currentDate = selectedDate;
      this.setState({date: currentDate});
      this.setState({birthDay: this.formatDate(currentDate)});
  }
  formatDate = (rawDate) => {
    let date = new Date(rawDate);
    const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate;
  }
  validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  validatePassword = (password) => {
      const regex = /^.{8,}$/;
      return regex.test(password);
  };
  validatePhoneNumber = (phoneNumber) => {
    const regex = /^0\d{9}$/;
    return regex.test(phoneNumber);
  };
  finishRegister = () => {
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const phoneNumber = this.state.phoneNumber;
    const birthDay = this.state.birthDay;
    let check=true;
      if(password !== this.state.confirmPassword) {
        check=false;
        this.setState({confirmPasswordError: 'Password does not match'});
      } 
      if(!this.validateEmail(email)) {
        check=false;
        this.setState({emailError: 'Invalid email address'});
      }
      if(!this.validatePassword(password)) {
        check=false;
        this.setState({passwordError: 'Password must contain at least 8 characters'});
      }
      if(!this.validatePhoneNumber(phoneNumber)) {
        check=false;
        this.setState({phoneNumberError: 'Invalid phone number'});
      }
      if(birthDay === null) {
        check=false;
        this.setState({birthDayError: 'Please choose your birthday'});
      }
      if(check) {
        this.setState({loading: true});
        setTimeout(() => {this.setState({loading: false});}, 5000);
        alert('Register successfully');
        alert(JSON.stringify(params));
      }   
  }
  render() {
    const passing = this.props.route.params;
    params ={
      username: passing.name,
      email: this.state.email, 
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      skill: passing.skills,
      birthDay: this.state.birthDay,
      userTopicSkill: [""],
      learnTopicSkill : passing.choosenTopic,      
      avatar:  passing.image,
      imageCerti: passing.certification,
      description: passing.description,
    }
    return (
      <GradienLayout innerStyle={{height: scale(600)}}>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginTop: 5}]}>YOUR ACCOUNT</Text>
        <ScrollView style={{marginVertical: 10}}>

          <InputText 
            placeholder='Enter your email address'
            label='Email'
            error={this.state.emailError}
            onFocus={()=>this.setState({emailError: null})}
            iconName='mail'
            onChangeText={(text)=>this.setState({email: text})}/>
          <InputText 
            placeholder='Enter your password'
            label='Password'
            error={this.state.passwordError}
            onFocus={()=>this.setState({passwordError: null})}
            password={true}
            iconName='lock'
            onChangeText={(text)=>this.setState({password: text})}/>
          
          <InputText 
            placeholder='Confirm your password'
            label='Confirm Password'
            error={this.state.confirmPasswordError}
            onFocus={()=>this.setState({confirmPasswordError: null})}
            password={true}
            iconName='lock'
            onChangeText={(text)=>this.setState({confirmPassword: text})}/>
          <InputText 
            placeholder='Your phone number'
            label='Phone Number'
            error={this.state.phoneNumberError}
            onFocus={()=>this.setState({phoneNumberError: null})}
            iconName='phone'
            keyboardType='numeric'
            onChangeText={(text)=>this.setState({phoneNumber: text})}/>
          <TouchableOpacity onPress={
            ()=>{
              this.tooglePicker();
              this.setState({birthDayError: null})
            }
            }>
            <InputText
              placeholder='Your birthday'
              label='Birthday'
              error={this.state.birthDayError}
              editable={false}
              iconName='calendar'
              value={this.state.birthDay? this.state.birthDay : "Your Birthday"}
              />
          </TouchableOpacity>
        </ScrollView>
        {this.state.showPicker && <DateTimePicker
          display="spinner"
          value={this.state.date}
          mode="date"
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date()}
          onChange={(event, selectedDate)=>this.onDateChange(event, selectedDate)}/>}
        
        <Text style={[styles.termText]}>By signing up you are agreeing our</Text>
        <TouchableOpacity onPress={()=>this.tooglePolicy()}>
          <Text style={[styles.termText, {color: COLORS.orange, textDecorationLine: 'underline'}]}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        
        <CustomButton text='Finish' onPress={()=>this.finishRegister()} style={{marginBottom: 10}}></CustomButton>   
        <Modal 
          transparent={true}
          visible={this.state.showPolicy}
          onRequestClose={()=>this.tooglePolicy()}>
            <Policy onPress={() =>this.tooglePolicy()}></Policy>
        </Modal>          
      </GradienLayout>
    );
  }
}
export default ChooseTopic;