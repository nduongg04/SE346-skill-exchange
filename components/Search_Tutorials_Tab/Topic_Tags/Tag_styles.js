import { StyleSheet } from "react-native-web";
import { COLORS } from "../../../constants";
import { scale } from "react-native-size-matters";
const styles = StyleSheet.create({
    button: {
        width: '30%', 
        padding: 5, 
        borderWidth: 0.5, 
        borderColor: COLORS.orange,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 5,
        marginTop: 0,
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 5
    },
    buttonText: {
        fontSize: scale(14),
        textAlign: 'center',
        fontFamily: 'Coda-Regular',
        color: COLORS.orange
    },
});
