import { render } from "react-dom";
import InputText from "../../register/Button/InputText";
import { SafeAreaView } from "react-native-safe-area-context";
import {search} from "@assets/icons/search.svg"
import axios from 'axios'; 

const InputTextBox = () => {
    const [query, setQuery] = useState('');
    const handleFocus = () => {
        Keyboard.show();
    };
  
     handleOnChangeText = async (text) => {
      setQuery(text); // Cập nhật giá trị của query
        
        // Gọi API sử dụng Axios
        const getuser = () => { 
          axios.get('https://se346-skillexchangebe.onrender.com'+'/api/v1/user/find/topic?topics='+text)
          .then(response => {
            if(response.status == 404) alert ('Not Found')
          })
          .then(result => {
            const users = result.data.users;
          })  
        
         
  
        // Chuyển hướng đến màn hình (hoặc component) chứa người dùng
        this.navigateToUserScreen(users); // Hàm này cần được định nghĩa một cách phù hợp để thực hiện chuyển hướng
      
        // Xử lý lỗi nếu có
        Alert.alert('Error', 'Failed to fetch users. Please try again later.');
        console.error(error);
        
      }
    };
    const navigateToUserScreen = (users) => {
      // Thực hiện chuyển hướng đến màn hình (hoặc component) chứa người dùng
      // Điều này có thể bao gồm việc hiển thị danh sách người dùng trên giao diện người dùng, hoặc chuyển hướng đến một màn hình (hoặc component) khác, tùy thuộc vào cách bạn tổ chức ứng dụng của bạn
      console.log("Navigating to user screen with users:", users);
      // Ví dụ: navigation.navigate('UserScreen', { users: users });
    };
  
    return (
      <SafeAreaView>
        <InputText
            placeholder = 'Enter your topic'
            label='Enter your query'
            iconName='search'
            onFocus={handleFocus}
            onChangeText={handleOnChangeText} // Truyền hàm xử lý onChangeText
            value={query} // Truyền giá trị của query
            style={{ marginTop: 20 }} // Style cho InputText (nếu cần)
        />
         <TouchableOpacity onPress={handleOnChangeText}>
        <Image
          source={search} // Đường dẫn đến hình ảnh
          style={{ width: 30, height: 30 }} // Kích thước của hình ảnh và margin top (tuỳ chỉnh theo nhu cầu)
        />
      </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default InputTextBox;