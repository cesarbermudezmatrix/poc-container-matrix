/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  verbose: true,
  testMatch: ["**/*.(test|steps).+(ts|tsx|js)"],
  coveragePathIgnorePatterns: ["/node_modules/", "/test/", "/dist/"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
        testEnvironment: "node",
        collectCoverage: true,
      },
    ],
  },
};
