module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: [".*/__tests__/setup.ts"],
    moduleFileExtensions: ["ts", "js"],
    modulePaths: ["<rootDir>/src/"],
};
