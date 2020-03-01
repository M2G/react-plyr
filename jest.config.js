module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  "preset": "ts-jest",
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(tsx|ts)?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "modulePaths": [],
  "moduleNameMapper": {
    '\\.(css|scss)$': 'identity-obj-proxy',
    "^@utils$": "<rootDir>/src/utils",
    "^@constants$": "<rootDir>/src/constants"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/(build|node_modules)/"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.ts",
};
