import { useEffect, useState } from "react";
import Information from "../../components/home/Information";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { err } from "react-native-svg";
const User = () => {
    const props = {
        username: "Suzy",
        skill: ["Actress", "Singer"],
        birthDay: "11/08/2004",
        userTopicSkill: ["Actress", "Singer"],
        avatar: require("../../assets/icons/Suzy.png"),
        imageCerti: [
            require("../../assets/icons/Suzy.png"),
            require("../../assets/icons/Suzy.png"),
        ],
        description:
            "I’m an actress. I have participated in several K-dramas: 'Dream High,' Suzy starred in several popular K-dramas, including 'Gu Family Book' (2013), 'Uncontrollably Fond' (2016), and 'Vagabond' (2019).",
    };

    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY2NzE5MGY5MTA2ZTk0ZDJhN2E5YzAiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzEyNTcwNDA2LCJleHAiOjE3MTI1NzQwMDZ9.gdz37gZnl_9eeo201swum6TRsjsl5to_KGG3uPgAWEY"

    // const baseUrl = "https://se346-skillexchangebe.onrender.com";

    // const { id } = useLocalSearchParams();

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(`${baseUrl}/api/v1/user/findbyid/${id}`, {
    //                 headers: {
    //                     "Authorization": `Bearer ${accessToken}`,
    //                 },
                
    //             });
    //             setUser(response.data);
    //         } catch (error) {
    //             console.log("Error: " + error);
    //         }
    //     };

    //     fetchUser();
    // }, []);

    return <Information {...props} />;
};
export default User;
