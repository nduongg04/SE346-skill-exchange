// tests/utils/handleChangeNewSkills.test.js

import { handleChangeYourSkills } from "../app/change-your-skills/index";
import { handleChangeNewSkills } from "../app/change-new-skills/index";
import { handleChangeSkillDescription } from "../app/change-skill-description";
import PatchData from "../utils/patchdata";

// Mocking the external functions
jest.mock("../utils/patchdata");
global.alert = jest.fn(); // Mock the global alert method
global.fetch = jest.fn(); // Mock the global fetch method

describe("handleChangeUserSkills", () => {
  const user = { id: "123", userTopicSkill: [] }; // Mock user object
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test("should show alert when no topics are selected", async () => {
    const updatedTopics = []; 

    await handleChangeYourSkills(user, updatedTopics);

    expect(alert).toHaveBeenCalledWith("Please choose at least one topic");
  });

  test("should call PatchData and show alert when success", async () => {
    const updatedTopics = ["Coding"]; 

    PatchData.mockResolvedValueOnce({}); 

    await handleChangeYourSkills(user, updatedTopics);

    // Check if PatchData was called with the correct URL and data
    expect(PatchData).toHaveBeenCalledWith(
      "https://se346-skillexchangebe.onrender.com/api/v1/user/update/123",
      { userTopicSkill: updatedTopics }
    );

    expect(alert).toHaveBeenCalledWith("Updated successfully");
  });

});

describe("handleChangeNewSkills", () => {
    const user = { id: "123", learnTopicSkill: [] }; // Mock user object
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });
    
    test("should show alert when no topics are selected", async () => {
        const updatedTopics = []; 
    
        await handleChangeNewSkills(user, updatedTopics);
    
        expect(alert).toHaveBeenCalledWith("Please choose at least one topic");
    });
    
    test("should call PatchData and show alert when success", async () => {
        const updatedTopics = ["Coding"]; 
    
        PatchData.mockResolvedValueOnce({}); 
    
        await handleChangeNewSkills(user, updatedTopics);
    
        // Check if PatchData was called with the correct URL and data
        expect(PatchData).toHaveBeenCalledWith(
        "https://se346-skillexchangebe.onrender.com/api/v1/user/update/123",
        { learnTopicSkill: updatedTopics }
        );
        expect(alert).toHaveBeenCalledWith("Updated successfully");
    });
    
});

describe("handleChangeSkillDescription", () => {
    const user = { id: "123", skill: [] }; // Mock user object
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    test("should call PatchData and show alert when success", async () => {
        const skill = "Master coding"; 

        PatchData.mockResolvedValueOnce({}); 

        await handleChangeSkillDescription(user, skill);

        // Check if PatchData was called with the correct URL and data
        expect(PatchData).toHaveBeenCalledWith(
        "https://se346-skillexchangebe.onrender.com/api/v1/user/update/123",
        { skill: [skill] }
        );

        expect(alert).toHaveBeenCalledWith("Update successfully");
    });

    test("handle skill null", async () => {
        const skill = null; 

        PatchData.mockResolvedValueOnce("404"); 

        await handleChangeSkillDescription(user, skill);

        expect(alert).toHaveBeenCalledWith("Something went wrong when updating user's skill");
    });
});

