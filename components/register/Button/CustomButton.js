import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
const CustomButton = ({ 
    onPress, 
    text,
    style
}) => {
    return (
        <TouchableOpacity style={[{ 
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',        
                borderRadius: 25,
                width: 80, height: 33,
                marginTop: 10,
                marginRight: 30 }, {backgroundColor: COLORS.orange}, style]}
                onPress={onPress}>
        <Text 
            style={[{
                fontSize: 14, 
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 0,
                fontFamily: 'Coda-Regular'},{color: COLORS.lightWhite}]}>{text}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton;