import HandleSessionExpired from "../handlesession"
import axios from "axios"
const PostData = (url, data) => {
    const baseUrl = "https://api.example.com"
    const postUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken")
        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            if (error.response.status !== 401) {
                Alert.alert("Error", "Please try again", [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ])
            } else {
                return null
            }
        }
    }
}

export default PostData