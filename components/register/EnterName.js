import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import { useFonts } from 'expo-font';
import {COLORS} from '../../constants'

function App() {
    const [fontsLoaded, fontError] = useFonts({
        'Coda-Regular': require('../../assets/fonts/Coda-Regular.ttf'),
      });
    return (
        <LinearGradient
            style={styles.container}
            colors={["#FFBE98", "#7751C7"]}
            >
            <View style={[styles.floating]}>
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
                    Welcomee
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
                    >Registerr</Text >
                <TextInput
                    style={{height: 45, 
                            borderRadius: 30, 
                            width: 285,
                            alignSelf: 'center', 
                            borderColor: COLORS.black,
                            borderWidth: 0.5, 
                            backgroundColor: COLORS.lightGray,
                            paddingLeft: 30, 
                            fontSize: 14, 
                            fontFamily: 'Coda-Regular'                       
                        }}
                    placeholder="Your name">
                </TextInput>
                <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text 
                        style={[styles.buttonText,{color: COLORS.lightWhite}]}>Nextt</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
                    <Text 
                        style={{
                            fontFamily: 'Coda-Regular',
                            fontSize: 14, marginRight: 5, marginTop: 5                     
                        }}>Already have an account?</Text>
                    <TouchableOpacity 
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
            </View>
        </LinearGradient>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    floating: {
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 554/896*windowHeight,  //554/896
        width: 372/410*windowWidth, //372/410,
        paddingTop: 25
    },
    image: {
        height: windowHeight*147/896,
        width: 305,
        alignSelf: 'center'
    },
    text_center: {
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: 'Coda-Regular'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',        
        borderRadius: 25,
        width: 80, height: 33,
        marginTop: 10,
        marginRight: 35 
    },
    buttonText: {
        fontSize: 14, 
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 0,
        fontFamily: 'Coda-Regular'
    }

});

registerRootComponent(App);