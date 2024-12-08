import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Login from "../components/login/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

// Mock dependencies
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("../context/AuthContext", () => ({
  useSession: jest.fn(),
}));

jest.mock("../context/SocketContext", () => ({
  useSocketContext: jest.fn(),
}));
global.fetch = jest.fn();

describe("handleLogin", () => {
    const mockLogin = jest.fn();
    const mockNavigate = jest.fn();
    const mockSetSocket = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
      useSession.mockReturnValue({
        user: null,
        login: mockLogin,
      });
  
      useSocketContext.mockReturnValue({
        socket: null,
        setSocket: mockSetSocket,
        onlineUsers: [],
        setOnlineUsers: jest.fn(),
      });
    });
  
    test("shows an error if email is missing", async () => {
      const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);
  
      const loginButton = getByText("Login");
      // Without entering email or password
      await act(async () => {
        fireEvent.press(loginButton);
      });
  
      expect(getByText("Email is required")).toBeTruthy();
    });
    test("shows an error if password is missing", async () => {
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);

        const loginButton = getByText("Login");
        const emailInput = getByPlaceholderText("Enter your email address");
        fireEvent.changeText(emailInput, "abc@gmail.com");
        // Without entering email or password
        await act(async () => {
            fireEvent.press(loginButton);
        });

        expect(getByText("Password is required")).toBeTruthy();
    });
    test("Show an error if user not found", async () => {
        fetch.mockResolvedValue({
            status: 404,
            json: async () => ({ message: "User is not found" }),
        });

        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);

        const emailInput = getByPlaceholderText("Enter your email address");
        const passwordInput = getByPlaceholderText("Enter your password");
        const loginButton = getByText("Login");
        fireEvent.changeText(emailInput, "wrong@gmail.com");
        fireEvent.changeText(passwordInput, "wrongpassword");

        await act(async () => {
            fireEvent.press(loginButton);
        });

        await waitFor(() => {
            //Test if fetch is called with the correct arguments
            expect(fetch).toHaveBeenCalledWith("https://se346-skillexchangebe.onrender.com/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "wrong@gmail.com", password: "wrongpassword" }),
            });
            //Test if alert is called with the correct arguments
            expect(alert).toHaveBeenCalledWith("User not found");
        });
    });
    test("Show an error wrong password", async () => {
        fetch.mockResolvedValue({
            status: 401,
            json: async () => ({ message: "Unauthorized" }),
        });

        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);

        const emailInput = getByPlaceholderText("Enter your email address");
        const passwordInput = getByPlaceholderText("Enter your password");
        const loginButton = getByText("Login");
        fireEvent.changeText(emailInput, "neban0444@gmail.com");
        fireEvent.changeText(passwordInput, "wrongpassword");

        await act(async () => {
            fireEvent.press(loginButton);
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("https://se346-skillexchangebe.onrender.com/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "neban0444@gmail.com", password: "wrongpassword" }),
            });
            expect(alert).toHaveBeenCalledWith("Wrong email or password");
        });
    });
    test("Displays welcome modal with username on successful login", async () => {
        fetch.mockResolvedValue({
          status: 200,
          json: async () => ({
            data: { username: "Dat Tran", _id: "66740ac202e6ebaf219bf692" },
            access_token: "mockAccessToken",
            refresh_token: "mockRefreshToken",
          }),
        });
    
        const { getByPlaceholderText, getByText, queryByText } = render(<Login navigation={{ navigate: mockNavigate }} />);
    
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "neban0444@gmail.com");
        fireEvent.changeText(getByPlaceholderText("Enter your password"), "12345678");
    
        await act(async () => {
          fireEvent.press(getByText("Login"));
        });
    
        await waitFor(() => {
          // Check that welcome modal appears with correct username
          expect(queryByText("Welcome Dat Tran")).toBeTruthy();
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify({ username: "Dat Tran", _id: "66740ac202e6ebaf219bf692" }));
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("accessToken", "mockAccessToken");
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("refreshToken", "mockRefreshToken");
          expect(mockLogin).toHaveBeenCalledWith(
            expect.objectContaining({ username: "Dat Tran" })
          );
        });
      });

  });