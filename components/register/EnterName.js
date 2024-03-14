import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';

function App() {
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
                        fontSize: 21, 
                        color: '#FF843C',
                        margin: 20,
                        alignSelf: 'center',
                        fontFamily: 'Coda-Regular'      
                    }}
                    >
                    Welcome
                </Text>
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
        height: 160,
        width: 365
    }

});

registerRootComponent(App);