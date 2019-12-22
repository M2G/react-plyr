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
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.ts",
};
