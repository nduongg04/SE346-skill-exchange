describe("shuffleArray", () => {
	const { shuffleArray } = require("../app/(tabs)/home");

	test("should shuffle array [1, 2, 3, 4, 5]", () => {
		const input = [1, 2, 3, 4, 5];
		const originalArray = [...input];
		const result = shuffleArray(input);

		// Check that all elements are present
		expect(result.sort((a, b) => a - b)).toEqual(
			originalArray.sort((a, b) => a - b)
		);

		// Check that at least one element has moved position
		const hasChanged = result.some(
			(val, idx) => val !== originalArray[idx]
		);
		expect(hasChanged).toBe(true);
	});

	test("should handle single element array [42]", () => {
		const input = [42];
		const result = shuffleArray(input);
		expect(result).toEqual([42]);
	});

	test("should handle empty array []", () => {
		const input = [];
		const result = shuffleArray(input);
		expect(result).toEqual([]);
	});

	test("should shuffle large array of consecutive numbers", () => {
		const input = Array.from({ length: 1000 }, (_, i) => i + 1);
		const originalArray = [...input];
		const result = shuffleArray(input);

		// Check that all elements are present
		expect(result.sort((a, b) => a - b)).toEqual(
			originalArray.sort((a, b) => a - b)
		);

		// Check that at least one element has moved position
		const hasChanged = result.some(
			(val, idx) => val !== originalArray[idx]
		);
		expect(hasChanged).toBe(true);
	});

	test("should shuffle array of strings", () => {
		const input = ["apple", "banana", "cherry", "date"];
		const originalArray = [...input];
		const result = shuffleArray(input);

		// Check that all elements are present
		expect(result.sort()).toEqual(originalArray.sort());

		// Check that at least one element has moved position
		const hasChanged = result.some(
			(val, idx) => val !== originalArray[idx]
		);
		expect(hasChanged).toBe(true);
	});
});

describe("getTopicUrl", () => {
	const { getTopicUrl } = require("../app/(tabs)/home");
	
	const baseUrl = "https://se346-skillexchangebe.onrender.com";
	
	test("should create URL with multiple topics", () => {
		const mockUser = {
			learnTopicSkill: [
				{ name: "JavaScript" },
				{ name: "React" },
				{ name: "Node.js" }
			]
		};
		
		const result = getTopicUrl(baseUrl, mockUser);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=JavaScript,React,Node.js,`);
	});

	test("should create URL with single topic", () => {
		const mockUser = {
			learnTopicSkill: [
				{ name: "Python" }
			]
		};
		
		const result = getTopicUrl(baseUrl, mockUser);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=Python,`);
	});

	test("should handle empty topic name", () => {
		const mockUser = {
			learnTopicSkill: [
				{ name: "" }
			]
		};
		
		const result = getTopicUrl(baseUrl, mockUser);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=,`);
	});

	test("should handle null topic name", () => {
		const mockUser = {
			learnTopicSkill: [
				{ name: null }
			]
		};
		
		const result = getTopicUrl(baseUrl, mockUser);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=null,`);
	});

	test("should handle empty learnTopicSkill array", () => {
		const mockUser = {
			learnTopicSkill: []
		};
		
		const result = getTopicUrl(baseUrl, mockUser);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=`);
	});

	test("should handle undefined user", () => {
		const result = getTopicUrl(baseUrl, undefined);
		expect(result).toBe(`${baseUrl}/api/v1/user/find/topic?topics=`);
	});
});

jest.mock("../utils/getdata");  // Mock the GetData module

describe("getUsersByTopic", () => {
	const { getUsersByTopic } = require("../app/(tabs)/home");
	const GetData = require("../utils/getdata");
	
	const baseUrl = "https://se346-skillexchangebe.onrender.com";
	
	beforeEach(() => {
		// Clear mock before each test
		jest.clearAllMocks();
	});

	test("should fetch users based on topics", async () => {
		const mockUser = {
			learnTopicSkill: [
				{ name: "JavaScript" },
				{ name: "React" }
			]
		};
		
		const mockUsers = [
			{ id: 1, name: "User 1" },
			{ id: 2, name: "User 2" }
		];
		
		// Mock the GetData implementation
		GetData.default.mockResolvedValue(mockUsers);
		
		const result = await getUsersByTopic(baseUrl, mockUser);
		
		// Check if GetData was called with correct URL
		expect(GetData.default).toHaveBeenCalledWith(
			`${baseUrl}/api/v1/user/find/topic?topics=JavaScript,React,`
		);
		
		// Check the result
		expect(result).toEqual(mockUsers);
	});

	test("should handle empty topics URL", async () => {
		const mockUser = {
			learnTopicSkill: []
		};
		
		const mockUsers = [];
		GetData.default.mockResolvedValue(mockUsers);
		
		const result = await getUsersByTopic(baseUrl, mockUser);
		
		expect(GetData.default).toHaveBeenCalledWith(
			"https://se346-skillexchangebe.onrender.com/api/v1/user/find/topic?topics="
		);
		expect(result).toEqual([]);
	});

	test("should handle invalid URL", async () => {
		const mockUser = {
			learnTopicSkill: [{ name: "JavaScript" }]
		};
		
		// Mock network error for invalid URL
		GetData.default.mockRejectedValue(new Error("Network Error"));
		
		await expect(getUsersByTopic("https://invalid-url.com", mockUser))
			.rejects.toThrow("Network Error");
		
		expect(GetData.default).toHaveBeenCalledWith(
			"https://invalid-url.com/api/v1/user/find/topic?topics=JavaScript,"
		);
	});
});





