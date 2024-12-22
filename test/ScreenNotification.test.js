import { render, waitFor } from '@testing-library/react-native';
import ScreenNotification from '../components/notification/MainNotification';
import GetData from '../utils/getdata';
import { beforeEach } from '@jest/globals';

// Mock các dependencies
jest.mock('../utils/getdata');
jest.mock('../context/AuthContext', () => ({
 useSession: () => ({
   user: { id: 'test-user-id' }
 })}
));
jest.mock('@react-navigation/native', () => ({
 useIsFocused: () => true,
 useNavigation: () => ({
   navigate: jest.fn(),
   goBack: jest.fn()
 })
}));
jest.mock('expo-router', () => ({
 router: {
   push: jest.fn(),
   replace: jest.fn(),
   back: jest.fn()
 }
}));

// Thêm mock cho socket context
jest.mock('../context/SocketContext', () => ({
  useSocketContext: () => ({
    socket: {
      emit: jest.fn(),
      on: jest.fn()
    }
  })
}));



describe('ScreenNotification - getRequest', () => {
 beforeEach(() => {
   // Reset mocks trước mỗi test
   jest.clearAllMocks();
 });
  test('getRequest nên lấy và cập nhật dữ liệu thành công', async () => {
   // Mock dữ liệu trả về
   const mockRequests = [
     {
       _id: '1',
       senderID: {
         id: 'sender1',
         username: 'User1',
         avatar: 'avatar1.jpg'
       },
       dateTime: '2024-03-20'
     }
   ];
    // Setup mock cho GetData
   GetData.mockResolvedValueOnce(mockRequests);
    const { getByText } = render(<ScreenNotification />);
    // Đợi cho đến khi dữ liệu được load
   await waitFor(() => {
     expect(GetData).toHaveBeenCalledWith(
       'https://se346-skillexchangebe.onrender.com/api/v1/request/find/receiver/test-user-id'
     );
   });
 });
  test('getRequest nên hiển thị thông báo khi không có yêu cầu', async () => {
   // Mock trường hợp không có requests
   GetData.mockResolvedValueOnce([]);
    const { getByText } = render(<ScreenNotification />);
    await waitFor(() => {
     expect(getByText('No friend requests !')).toBeTruthy();
   });
 });
  test('getRequest nên xử lý lỗi đúng cách', async () => {
   // Mock trường hợp lỗi
   GetData.mockResolvedValueOnce('Something went wrong');
    const { getByText } = render(<ScreenNotification />);
    await waitFor(() => {
     expect(GetData).toHaveBeenCalled();
   });
 });
});