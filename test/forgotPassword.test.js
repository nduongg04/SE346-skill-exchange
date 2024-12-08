import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ForgotPassword from "../components/login/ForgotPassword"; // Adjust the path

global.fetch = jest.fn();
global.alert = jest.fn();

describe("sendMail function", () => {
    const setup = () => {
        return render(<ForgotPassword navigation={{ navigate: jest.fn() }} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("sendMail should handle successful email sending", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: "1234" }),
        });
    
        const { getByPlaceholderText, getByText, queryByText } = setup();
    
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fireEvent.press(getByText("Send"));
    
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "https://se346-skillexchangebe.onrender.com/api/v1/service/sendEmail",
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({ email: "test@example.com" }),
                })
            );
            expect(getByText("We will send you an email to reset your password")).toBeTruthy();
        });
    });
    
    test("sendMail should handle failed email sending", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({ message: "User not found" }),
        });
    
        const { getByPlaceholderText, getByText } = setup();
    
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fireEvent.press(getByText("Send"));
    
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith("User not found");
        });
    });
});

describe("checkCode function", () => {
    const setup = () => {
        return render(<ForgotPassword navigation={{ navigate: jest.fn() }} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("checkCode should handle valid code", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();

        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: validCode }), 
        });
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), enteredCode);
    
        // Trigger the check
        fireEvent.press(getByText("Submit"));
        expect(getByPlaceholderText("Enter your new password")).toBeTruthy();
    });
    
    test("checkCode should handle invalid code", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();

        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: validCode }), 
        });
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        fireEvent.press(getByText("Submit"));
        expect(getByText("Code is required")).toBeTruthy();

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), wrongCode);
    
        // Trigger the check
        fireEvent.press(getByText("Submit"));
    
        expect(getByText("Invalid code")).toBeTruthy();
    });
    
});
describe("ForgotPassword Component - handleResetPassword", () => {
    const setup = () => {
        return render(<ForgotPassword navigation={{ navigate: jest.fn() }} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("shows error when password is empty", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();

        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: validCode }), 
        });
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), enteredCode);
    
        // Trigger the check
        fireEvent.press(getByText("Submit"));
        expect(getByPlaceholderText("Enter your new password")).toBeTruthy();

        const newPasswordInput = getByPlaceholderText("Enter your new password");
        const confirmPasswordInput = getByPlaceholderText("Confirm your new password");
        const resetButton = getByText("Reset Password");

        fireEvent.changeText(newPasswordInput, "");
        fireEvent.changeText(confirmPasswordInput, "");
        fireEvent.press(resetButton);

        expect(getByText("Password is required")).toBeTruthy();
    });

    test("shows error when passwords do not match", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();

        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: validCode }), 
        });
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), enteredCode);
    
        // Trigger the check
        fireEvent.press(getByText("Submit"));
        expect(getByPlaceholderText("Enter your new password")).toBeTruthy();


        const newPasswordInput = getByPlaceholderText("Enter your new password");
        const confirmPasswordInput = getByPlaceholderText("Confirm your new password");
        const resetButton = getByText("Reset Password");

        fireEvent.changeText(newPasswordInput, "password123");
        fireEvent.changeText(confirmPasswordInput, "differentpassword");
        fireEvent.press(resetButton);

        expect(getByText("Password does not match")).toBeTruthy();
    });

    test("shows error when password is less than 8 characters", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();

        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ userCode: validCode }), 
        });
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), enteredCode);
    
        // Trigger the check
        fireEvent.press(getByText("Submit"));
        expect(getByPlaceholderText("Enter your new password")).toBeTruthy();
        const newPasswordInput = getByPlaceholderText("Enter your new password");
        const confirmPasswordInput = getByPlaceholderText("Confirm your new password");
        const resetButton = getByText("Reset Password");

        fireEvent.changeText(newPasswordInput, "short");
        fireEvent.changeText(confirmPasswordInput, "short");
        fireEvent.press(resetButton);

        expect(getByText("Password must be at least 8 characters")).toBeTruthy();
    });

    test("handles successful password reset", async () => {
        // Mock the state setup
        const { getByPlaceholderText, getByText, queryByText } = setup();
        
        // Set initial state
        const validCode = "1234"; 
        const enteredCode = "1234"; 
        const wrongCode = "5678";  
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "Password reset successful", userCode: validCode }),
        });

        // Simulate the process of sending the email, so the user has a code to verify
        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test@example.com");
        fireEvent.press(getByText("Send"));

        await waitFor(() => {
            expect(getByText("Verify Code")).toBeTruthy(); 
        });

        // Now simulate the user entering the verification code
        fireEvent.changeText(getByPlaceholderText("Verify code"), enteredCode);

        // Trigger the check
        fireEvent.press(getByText("Submit"));
        expect(getByPlaceholderText("Enter your new password")).toBeTruthy();


        const newPasswordInput = getByPlaceholderText("Enter your new password");
        const confirmPasswordInput = getByPlaceholderText("Confirm your new password");
        const resetButton = getByText("Reset Password");

        fireEvent.changeText(newPasswordInput, "password123");
        fireEvent.changeText(confirmPasswordInput, "password123");
        fireEvent.press(resetButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "https://se346-skillexchangebe.onrender.com/api/v1/service/sendEmail",
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({ email: "test@example.com" }),
                })
            );
            expect(fetch).toHaveBeenCalledWith(
                "https://se346-skillexchangebe.onrender.com/api/v1/user/changepassword",
                expect.objectContaining({
                    method: "PATCH",
                    body: JSON.stringify({
                        email: "test@example.com",
                        password: "password123",
                    }),
                })
            );
            expect(queryByText("Password reset successful")).toBeTruthy();
        });
    });

});