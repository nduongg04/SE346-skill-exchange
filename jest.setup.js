jest.mock("@assets/favicon.svg", () => "favicon-mock");
jest.mock('@react-native-async-storage/async-storage');

global.alert = jest.fn();