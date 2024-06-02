import { useEffect, useState } from "react";
import Information from "../../components/home/Information";
import { useLocalSearchParams } from "expo-router";
import GetData from "../../utils/getdata";
import { router } from "expo-router";
import InformationRequest from "../../components/notification/informationRequest";

const Redirect = () => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const { id } = useLocalSearchParams();
	const {idRequest}= useLocalSearchParams();
	console.log(idRequest);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUserById = async () => {
			const url = `${baseUrl}/api/v1/user/findbyid/${id}`;
			const data = await GetData(url);
			console.log(data);
			setUser(data);
		};

		getUserById();
	}, []);

	return <InformationRequest userRequest={user} idRequest={idRequest}  />;
};
export default Redirect;
