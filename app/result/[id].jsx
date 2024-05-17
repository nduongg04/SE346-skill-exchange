import { useEffect, useState } from "react";
import Result_Screen from "../../components/Search_Tutorials_Tab/Result_Screen";
import GetData from "../../utils/getdata";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../../utils/checkrefreshtoken';

const User = () => {
	const { data } = useLocalSearchParams();
	let [user, setUser] = useState(null);
	useEffect(()=>{
		const getuser = async () => {
			const refreshtoken = await AsyncStorage.getItem('refreshtoken');
			const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNmMTk0OTllYmEwMGYyYWNjNDcyMWMiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxNTY4MTc2NCwiZXhwIjoxNzE4MjczNzY0fQ.eMP2ooK2KsAyszZksaB3OYPW3N7KnqM4o48Q5NPw4WA"
			const bareUrl = "https://se346-skillexchangebe.onrender.com";
			try {
			  const response = await axios({
				method: 'get',
				maxBodyLength: Infinity,
				url: `${bareUrl}/api/v1/user/find/topic?topics=${data}`,
				headers: {
				  'Authorization': `Bearer ${accessToken}`
				}
			  });
			  if (response.status === 200) {
				Alert.alert("Success", "We get it!");
				console.log("dta:", response.data.data);
				user = response.data.data;
			  } 
			} catch (error) {
			  Alert.alert("Error", "Failed to fetch users. Please try again later.");
			  console.error(error);
			}
		};
		getuser();
		console.log("user: ", user);
	},[])
	
	useEffect(()=>{
		console.log("Here:",data);
	},[])
	const handleBackButton = () => {
		router.back();
	};

	return <Result_Screen {...user} handleBackButton={handleBackButton} />;
};
export default User;
