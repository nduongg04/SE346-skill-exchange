import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
class ChooseTopic extends React.Component {
  state = {
    uploadVisible: false,
    topic: ['Cooking', 'Fishing', 'Gardening', 'Photography', 
            'Painting', 'Sewing', 'Woodworking', 'Writing', 'Yoga', 'Others',
            'Painting', 'Sewing', 'Woodworking', 'Writing', 'Yoga', 'Others'],
    choosenTopic: []
    }
    selectTopic = (item) => {
        this.setState(prevState => {
            if (prevState.choosenTopic.includes(item)) {
                return { choosenTopic: prevState.choosenTopic.filter(topic => topic !== item) };
            } else {
                return { choosenTopic: [...prevState.choosenTopic, item] };
            }
        });
    };
  render() {
    const passing = this.props.route.params;
    params ={
      name: passing.name,
      image:  passing.image,
      description: passing.description,
      skills: passing.skills,
      certification: passing.certification,
      topic: this.state.choosenTopic
    }
    return (
      <GradienLayout>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginTop: 10}]}>CHOOSE TOPIC</Text>
        <Text style={styles.text_center}>you want to learn</Text>
        <View 
            style={{
                height: 4, 
                backgroundColor: COLORS.purple, 
                borderRadius: 50,
                width: 120,
                alignSelf: 'center',
                margin: 15 }}></View>
        <View style={{height: scale(260), alignSelf: 'center', width: scale(300)}}>
        <FlatList
            data={this.state.topic}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={this.state.choosenTopic.includes(item) ? styles.topicButtonSelected : styles.topicButton}
                    onPress={() => this.selectTopic(item)}>
                    <Text 
                        style={this.state.choosenTopic.includes(item) ? styles.topicTextSelected : styles.topicText} 
                        numberOfLines={1} 
                        ellipsizeMode='tail'>{item}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}/>
        </View>         
        <CustomButton text='Next' onPress={()=>this.props.navigation.navigate('UploadInfo', params)}></CustomButton>             
      </GradienLayout>
    );
  }
}
export default ChooseTopic;