// file: components/message/main/__tests__/MainMess.test.js
import React from 'react';
import { render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ScreenMess from '../components/message/main/MainMess';
import GetData from '../utils/getdata';
import { useSession } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';

jest.mock('../utils/getdata');
jest.mock('../context/AuthContext');
jest.mock('../context/SocketContext');

// Mock loadFonts function if it's used in your component


describe('ScreenMess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load chat data and update state', async () => {
    const mockUser = { id: 'user123' };
    const mockChatData = [
      {
            chatInfo: {
              _id: "1",
              members: [
                { id: "user123", username: "Alice", avatar: "https://example.com/alice.jpg" },
                { id: "user2", username: "Bob", avatar: "https://example.com/bob.jpg" }
              ]
            },
            latestMessage: [
              {
                senderID: { _id: "user123" },
                type: "text",
                content: "Hey Bob, how are you?",
                dateTime: new Date("2024-12-18T10:00:00Z")
              }
            ]
          },
          {
            chatInfo: {
              _id: "2",
              members: [
                { id: "user123", username: "Charlie", avatar: "https://example.com/charlie.jpg" },
                { id: "user3", username: "David", avatar: "https://example.com/david.jpg" }
              ]
            },
            latestMessage: [
              {
                senderID: { _id: "user3" },
                type: "image",
                content: "sent an image",
                dateTime: new Date("2024-12-18T11:00:00Z")
              }
            ]
          }];

    GetData.mockResolvedValue(mockChatData);
    useSession.mockReturnValue({ user: mockUser });
    useSocketContext.mockReturnValue({
      socket: { on: jest.fn(), off: jest.fn() },
      setSocket: jest.fn(),
      onlineUsers: [],
      setOnlineUsers: jest.fn()
    });

    const { getByText } = render(
      <NavigationContainer>
        <ScreenMess />
      </NavigationContainer>
    );

    await act(async () => {
      // Wait for the component to finish loading data
    });

    expect(GetData).toHaveBeenCalledWith(`https://se346-skillexchangebe.onrender.com/api/v1/chat/find/${mockUser.id}`);
    expect(getByText('Bob')).toBeTruthy();
    expect(getByText('David')).toBeTruthy();
  });

  it('should handle error when loading chat data', async () => {
    const mockUser = { id: 'user123' };

    GetData.mockResolvedValue("Something went wrong");
    useSession.mockReturnValue({ user: mockUser });
    useSocketContext.mockReturnValue({
      socket: { on: jest.fn(), off: jest.fn() },
      setSocket: jest.fn(),
      onlineUsers: [],
      setOnlineUsers: jest.fn()
    });

    const { queryByText } = render(
      <NavigationContainer>
        <ScreenMess />
      </NavigationContainer>
    );

    await act(async () => {
      // Wait for the component to finish loading data
    });

    expect(GetData).toHaveBeenCalledWith(`https://se346-skillexchangebe.onrender.com/api/v1/chat/find/${mockUser.id}`);
    expect(queryByText('John')).toBeNull();
    expect(queryByText('Doe')).toBeNull();
  });
});