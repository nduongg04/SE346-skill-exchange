import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "../../../constants";
import { scale } from "react-native-size-matters";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../../../utils/checkrefreshtoken';

const TagsButton = (props) => {
    const [data, setData] = useState([]);

    const handleOnPress = async () => {
        const refreshtoken = await AsyncStorage.getItem('refreshtoken');
        const accessToken = await CheckRefreshToken(refreshtoken);
        const bareUrl = "https://se346-skillexchangebe.onrender.com";
        const response = await axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${bareUrl}/api/v1/user/find/topic?topics=${props.name}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if(response.status == 200) {
            console.log(data);
        }
        setData(response.data.data);
        <SwiperList users={yourUsersArray} />
    }

    return (
        <TouchableOpacity onPress={handleOnPress}  style={styles.button}>
            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
        </TouchableOpacity>
    );
};

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

export default TagsButton;