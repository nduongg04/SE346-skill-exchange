import { createChat } from '../components/notification/Requests';
import PostData from '../utils/postdata';
import { Alert } from 'react-native';

// Mock các dependencies
jest.mock('../utils/postdata');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn()
}));

// Mock socket context
const mockSocket = {
  emit: jest.fn()
};
jest.mock('../context/SocketContext', () => ({
  useSocketContext: () => ({
    socket: mockSocket
  })
}));

describe('createChat', () => {
  beforeEach(() => {
    // Reset mocks trước mỗi test
    jest.clearAllMocks();
  });

  it('tạo chat thành công và emit socket event', async () => {
    // Mock response thành công
    PostData.mockResolvedValue({
      data: { chatId: '123', messages: [] }
    });

    const result = await createChat('user1', 'user2');

    expect(PostData).toHaveBeenCalledWith(
      'https://se346-skillexchangebe.onrender.com/api/v1/chat/create',
      {
        firstID: 'user1',
        secondID: 'user2'
      }
    );

    expect(mockSocket.emit).toHaveBeenCalledWith('acceptrequest', {
      recipientID: 'user1',
      chatData: { chatId: '123', messages: [] }
    });

    expect(result).toBe(true);
  });

  it('trả về false khi tạo chat thất bại', async () => {
    // Mock response thất bại
    PostData.mockResolvedValue(404);

    const result = await createChat('user1', 'user2');

    expect(Alert.alert).toHaveBeenCalledWith(
      'Alert',
      'Friend request unsuccessful.'
    );
    expect(result).toBe(false);
  });

  it('trả về false khi không có dữ liệu post', async () => {
    const result = await createChat(null, null);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Alert', 
      'Friend request unsuccessful.'
    );
    expect(result).toBe(false);
  });

  it('trả về false khi không có một trong hai dữ liệu post', async () => {
      const result = await createChat('user1', null);
  
      expect(Alert.alert).toHaveBeenCalledWith(
        'Alert', 
        'Friend request unsuccessful.'
      );
      expect(result).toBe(false);
    });
});
