import { render } from "react-dom";
import InputText from "../../register/Button/InputText";
import { SafeAreaView } from "react-native-safe-area-context";
import {search} from "@assets/icons/search.svg"

const InputTextBox = () => {
    const [query, setQuery] = useState('');
    const handleFocus = () => {
        Keyboard.show();
    };
  
    const handleOnChangeText = async (text) => {
      setQuery(text); // Cập nhật giá trị của query
  
      try {
        // Gọi API GET từ server
        const response = await fetch()
  
        // Xử lý dữ liệu từ server (ví dụ: hiển thị dữ liệu trong cửa sổ thông báo)
        Alert.alert('API Response', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data from server');
      }
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