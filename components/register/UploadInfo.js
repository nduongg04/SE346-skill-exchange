import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, Modal, TouchableOpacity, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
import { TextInput } from "react-native-gesture-handler";
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
      showPolicy: false
    }
  tooglePicker = () => {
    this.setState({showPicker: !this.state.showPicker});
  }
  tooglePolicy = () => {
    this.setState({showPolicy: !this.state.showPolicy});
  }
  onChange = ({type}, selectedDate) => {
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
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    const birthDay = this.state.birthDay;
    if(!confirmPassword || !password || !email || !birthDay ) {
      alert('Please fill in all the information');
    } else {
      if(password !== this.state.confirmPassword) {
        alert('Password does not match');
      }
      else{
        alert('Register successfully');
        alert(JSON.stringify(params));
      }
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
      <GradienLayout innerStyle={{height: scale(550)}}>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginBottom: 10}]}>YOUR ACCOUNT</Text>
        
        <Text style={styles.infoText}>Email</Text>
        <TextInput
         onChangeText={(text) => this.setState({email: text})}
         value={this.state.email}
          style={styles.inputText}
          placeholder="Your email address">
        </TextInput>

        <Text style={styles.infoText}>Password</Text>
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          style={styles.inputText}
          placeholder="Password" 
          secureTextEntry></TextInput>
        
        <Text style={styles.infoText}>Confirm Password</Text>
        <TextInput
          onChangeText={(text) => this.setState({confirmPassword: text})}
          value={this.state.confirmPassword}
          style={styles.inputText}
          placeholder="Password" 
          secureTextEntry></TextInput>
        <Text style={styles.infoText}>Phone Number</Text>
        <TextInput
         onChangeText={(text) => this.setState({phoneNumber: text})}
         value={this.state.phoneNumber}
          style={styles.inputText}
          placeholder="Your phone number">
        </TextInput>
        <Text style={styles.infoText}>Birthday</Text>
        <TouchableOpacity onPress={()=>this.tooglePicker()}>
          <Text style={[styles.inputText]} >
            {this.state.birthDay ? this.state.birthDay : "Birthday"}
          </Text>
        </TouchableOpacity>
        
        {this.state.showPicker && <DateTimePicker
          display="spinner"
          value={this.state.date}
          mode="date"
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date()}
          onChange={(event, selectedDate)=>this.onChange(event, selectedDate)}/>}
        
        <Text style={[styles.termText]}>By signing up you are agreeing our</Text>
        <TouchableOpacity onPress={()=>this.tooglePolicy()}>
          <Text style={[styles.termText, {color: COLORS.orange, textDecorationLine: 'underline'}]}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        
        <CustomButton text='Finish' onPress={()=>this.finishRegister()}></CustomButton>   
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