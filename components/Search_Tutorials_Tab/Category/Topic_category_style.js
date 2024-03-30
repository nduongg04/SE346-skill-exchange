import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
  fixToImage: {
  position: 'absolute',
    top: '85%', // Điều chỉnh theo yêu cầu
    textAlign: 'center',
    color: 'white', // Màu văn bản 
    fontSize: '20px',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
});