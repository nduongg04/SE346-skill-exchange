const { onSwipeRight } = require("../components/common/swiper/Swiper");
const PostData = require("../utils/postdata");

// Update the mock to handle default export
jest.mock("../utils/postdata", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("onSwipeRight", () => {
    // Mock data
    const mockUsers = [
        { id: "user1" },
        { id: "user2" },
        { id: "user3" }
    ];

    const mockUser = {
        id: "currentUser"
    };

    const baseUrl = "https://se346-skillexchangebe.onrender.com";

    beforeEach(() => {
        // Clear mock before each test
        jest.clearAllMocks();
        // Reset global variables if needed
        global.users = mockUsers;
        global.user = mockUser;
        global.baseUrl = baseUrl;
        // Reset the mock function
        PostData.default.mockReset();
    });

    test("should handle valid index successfully", async () => {
        // Mock successful response
        PostData.default.mockResolvedValueOnce("Success");

        const validIndex = 1;
        await onSwipeRight(validIndex);

        // Update verification to use PostData.default
        expect(PostData.default).toHaveBeenCalledWith(
            `${baseUrl}/api/v1/request/create`,
            {
                senderID: mockUser.id,
                receiverID: mockUsers[validIndex].id
            }
        );
        expect(PostData.default).toHaveBeenCalledTimes(1);
    });

    test("should retry on error response", async () => {
        // Update mock chain to use PostData.default
        PostData.default
            .mockResolvedValueOnce("Something went wrong")
            .mockResolvedValueOnce("Success");

        const validIndex = 0;
        await onSwipeRight(validIndex);

        expect(PostData.default).toHaveBeenCalledTimes(2);
        expect(PostData.default).toHaveBeenCalledWith(
            `${baseUrl}/api/v1/request/create`,
            {
                senderID: mockUser.id,
                receiverID: mockUsers[validIndex].id
            }
        );
    });

    test("should handle invalid index", async () => {
        const invalidIndex = 999;
        
        await expect(onSwipeRight(invalidIndex)).rejects.toThrow();
        
        // Update verification to use PostData.default
        expect(PostData.default).not.toHaveBeenCalled();
    });
}); 