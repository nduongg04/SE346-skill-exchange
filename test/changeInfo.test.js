import  {handleChangeInformation}  from "../app/change-information/index"; // Adjust the import path as needed
import PatchData from "../utils/patchdata"; // The function that makes the API request

jest.mock("../utils/patchdata", () => jest.fn());
global.fetch = jest.fn();
global.alert = jest.fn();

describe("handleChangeInformation", () => {
  let mockUser;

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup mock user data and the mock login function
    mockUser = {
      id: "1",
      username: "oldUsername",
      email: "oldemail@example.com",
      phoneNumber: "123456789",
    };
  });

  test("should update user information successfully", async () => {
    // Mock PatchData to simulate a successful update
    PatchData.mockResolvedValue({});

    const newUsername = "Dat Tran";
    const newEmail = "abc@gmail.com";
    const newPhoneNumber = "0123456789";

    // Call the function with new values
    await handleChangeInformation(mockUser ,newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData was called with the correct arguments
    expect(PatchData).toHaveBeenCalledWith(
      "https://se346-skillexchangebe.onrender.com/api/v1/user/update/1",
      {
        username: newUsername,
        email: newEmail,
        phoneNumber: newPhoneNumber,
      }
    );
    fetch.mockResolvedValue({
        ok: true,
    });
    expect(alert).toHaveBeenCalledWith("Updated successfully");
  });

  test("should show error if API call fails", async () => {
    // Mock PatchData to simulate a failure
    PatchData.mockResolvedValue("Something went wrong");

    const newUsername = "Dat Tran";
    const newEmail = "abc@gmail.com";
    const newPhoneNumber = "0123456789";

    // Call the function with new values
    await handleChangeInformation(mockUser, newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData was called
    expect(PatchData).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith("Something went wrong when updating user's skill");
  });

  test("should not call login or PatchData if inputs are empty", async () => {
    const newUsername = "";
    const newEmail = "";
    const newPhoneNumber = "";

    // Call the function with empty values
    await handleChangeInformation(mockUser, newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData and login were not called
    expect(PatchData).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith("Please fill all the fields");
  });

  test("invalid email", async () => {
    const newUsername = "Dat Tran";
    const newEmail = "abcgomail.com";
    const newPhoneNumber = "0123456789";

    // Call the function with invalid email
    await handleChangeInformation(mockUser, newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData and login were not called
    expect(alert).toHaveBeenCalledWith("Invalid email");
    expect(PatchData).not.toHaveBeenCalled();
  });
  test("invalid phone number", async () => {
    const newUsername = "Dat Tran";
    const newEmail = "abc@gmail.com";
    const newPhoneNumber = "1234567890";

    // Call the function with invalid phone number
    await handleChangeInformation(mockUser, newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData and login were not called
    expect(alert).toHaveBeenCalledWith("Invalid phone number");
    expect(PatchData).not.toHaveBeenCalled();
  });
  test("invalid username", async () => {
    const newUsername = "Dat@Tran";
    const newEmail = "abc@gmail.com";
    const newPhoneNumber = "0123456789";

    // Call the function with invalid username
    await handleChangeInformation(mockUser, newUsername, newEmail, newPhoneNumber);

    // Ensure PatchData and login were not called
    expect(alert).toHaveBeenCalledWith("Invalid username");
    expect(PatchData).not.toHaveBeenCalled();
  });

});
