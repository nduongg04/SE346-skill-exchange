import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import UploadInfo from "../components/register/UploadInfo";
jest.mock("react-native-mime-types", () => ({
  lookup: jest.fn().mockReturnValue("image/jpeg"),
}));
global.fetch = jest.fn();
global.alert = jest.fn();

describe("handleRegister", () => {
  const mockNavigate = jest.fn();
  const mockRoute = {
    params: {
      name: "JohnDoe",
      image: "path/to/avatar.jpg",
      certification: ["path/to/cert1.jpg", "path/to/cert2.jpg"],
      skills: ["JavaScript", "React"],
      userTopic: "Frontend Development",
      topic: "Backend Development",
      description: "A passionate developer",
    },
  };

  const setup = () => {
    return render(
      <UploadInfo navigation={{ navigate: mockNavigate }} route={mockRoute} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
  });


  test("validates email format correctly", () => {
    const { getByPlaceholderText, getByText } = setup();

    const emailInput = getByPlaceholderText("Enter your email address");
    fireEvent.changeText(emailInput, "invalid-email");

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);

    expect(getByText("Invalid email address")).toBeTruthy();
  });

  test("ensures passwords match", () => {
    const { getByPlaceholderText, getByText } = setup();

    const passwordInput = getByPlaceholderText("Enter your password");
    const confirmPasswordInput = getByPlaceholderText("Confirm your password");

    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "differentpassword");

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);

    expect(getByText("Password does not match")).toBeTruthy();
  });
  test("ensures password is at least 8 characters", () => {
    const { getByPlaceholderText, getByText } = setup();

    const passwordInput = getByPlaceholderText("Enter your password");
    const confirmPasswordInput = getByPlaceholderText("Confirm your password");

    fireEvent.changeText(passwordInput, "pass");
    fireEvent.changeText(confirmPasswordInput, "pass");

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);

    expect(getByText("Password must contain at least 8 characters")).toBeTruthy();
  });
  test("ensures phone number is valid & birthday not null", () => {
    const { getByPlaceholderText, getByText } = setup();

    const phoneInput = getByPlaceholderText("Your phone number");

    fireEvent.changeText(phoneInput, "invalid-phone");

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);

    expect(getByText("Invalid phone number")).toBeTruthy();
    expect(getByText("Please choose your birthday")).toBeTruthy();
  });

  test("handles successful registration", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({
        data: { username: "JohnDoe" },
      }),
    });

    const { getByPlaceholderText, getByText, queryByText, queryByTestId} = setup();

    fireEvent.changeText(getByPlaceholderText("Enter your email address"), "john.doe@example.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm your password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Your phone number"), "0123456789");
    // Open the DateTimePicker
    fireEvent.press(getByPlaceholderText("Your birthday"));

    // Simulate selecting a date (e.g., 1 Jan 2000)
    const selectedDate = new Date(2000, 0, 1); // 1 Jan 2000
    const datePicker = queryByTestId("dateTimePicker");
    expect(datePicker).toBeTruthy();
    fireEvent(datePicker, "onChange", {
        type: "set",
        nativeEvent: { timestamp: selectedDate.getTime() },
    });

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);
    await waitFor(() => {
        expect(queryByText("Welcome JohnDoe to Skill Exchange")).toBeTruthy();
    });
    fireEvent.press(getByText("OK"));
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });

  test("handles failed registration because server rejecting", async () => {
    //Handle Exist email, handle failed registration

    fetch.mockResolvedValue({
      ok: false
    });

    const { getByPlaceholderText, getByText, queryByText, queryByTestId } = setup();

    fireEvent.changeText(getByPlaceholderText("Enter your email address"), "john.doe@example.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm your password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Your phone number"), "0123456789");
    fireEvent.changeText(getByPlaceholderText("Your birthday"), "01/01/2000");

    // Open the DateTimePicker
    fireEvent.press(getByPlaceholderText("Your birthday"));

    // Simulate selecting a date (e.g., 1 Jan 2000)
    const selectedDate = new Date(2000, 0, 1); // 1 Jan 2000
    const datePicker = queryByTestId("dateTimePicker");
    expect(datePicker).toBeTruthy();
    fireEvent(datePicker, "onChange", {
        type: "set",
        nativeEvent: { timestamp: selectedDate.getTime() },
    });

    const finishButton = getByText("Finish");
    fireEvent.press(finishButton);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
      expect(queryByText("Welcome JohnDoe to Skill Exchange")).not.toBeTruthy();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
