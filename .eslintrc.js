const path = require('path');

module.exports = {
  "root": true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "./node_modules/eslint-config-airbnb-base/rules/best-practices.js",
    "./node_modules/eslint-config-airbnb-base/rules/errors.js",
    "./node_modules/eslint-config-airbnb-base/rules/node.js",
    "./node_modules/eslint-config-airbnb-base/rules/style.js",
    "./node_modules/eslint-config-airbnb-base/rules/variables.js",
    "./node_modules/eslint-config-airbnb-base/rules/es6.js",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:react/recommended",
    "eslint:all",
    "plugin:react/all",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
    extraFileExtensions: [".scss"],
    ecmaFeatures: {
      "jsx": true
    },
    useJSXTextNode: true
  },
  plugins: ["react", "@typescript-eslint", "jest", "prettier", "jsx-a11y"],
  rules: {
    "no-return-assign": 0,
    "no-restricted-syntax": 0,
    "no-cond-assign": 0,
    "no-unused-expressions": 0,
    "no-magic-numbers": 0,
    "no-invalid-this": 0,
    "no-ternary": 0,
    "no-console": 1,

    "max-statements": 0,
    "max-lines": 0,
    "max-lines-per-function": 0,
    "function-call-argument-newline": 0,

    "sort-imports": 0,

    "jsx-a11y/media-has-caption": 0,
    "jsx-a11y/rule-name": "off",

    "import/extensions": "off",
    "import/no-unresolved": 0,

    "lines-between-class-members": "off",

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-empty-function": 0,

    "react/jsx-props-no-spreading": 0,
    "react/prop-types": "off",
    "react/boolean-prop-naming": 0, // only for Plyr
    "react/static-property-placement": 0,
    "react/jsx-filename-extension": [0],
  },
  settings: {
    react:  {
      version: "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js",".jsx",".ts",".tsx"]
      }
    }
  },
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true
  }
};
