const path = require('path');

module.exports = {
  "root": true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "airbnb-typescript",
    "./node_modules/eslint-config-airbnb-base/rules/best-practices.js",
    "./node_modules/eslint-config-airbnb-base/rules/errors.js",
    "./node_modules/eslint-config-airbnb-base/rules/node.js",
    "./node_modules/eslint-config-airbnb-base/rules/style.js",
    "./node_modules/eslint-config-airbnb-base/rules/variables.js",
    "./node_modules/eslint-config-airbnb-base/rules/es6.js",
    "prettier",
    "prettier/standard",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:react/recommended",
    "eslint:all",
    "plugin:react/all",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/all",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
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
    "no-undefined": 0,
    "id-length": 0,
    "max-params": 0,
    "multiline-ternary": 0,
    "init-declarations": 0,
    "func-style": 0,
    "class-methods-use-this": 1,

    "max-statements": 0,
    "max-lines": 0,
    "max-lines-per-function": 0,
    "function-call-argument-newline": 0,

    "sort-imports": 0,
    "implicit-arrow-linebreak": 0,

    "jsx-a11y/media-has-caption": 0,
    "jsx-a11y/rule-name": "off",
    "jsx-a11y/click-events-have-key-events": 'off',
    "jsx-a11y/label-has-associated-control": 1,
    "jsx-a11y/no-noninteractive-element-interactions": 1,

    "import/extensions": "off",
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,

    "lines-between-class-members": "off",

    "@typescript-eslint/no-type-alias": 1,
    "@typescript-eslint/no-unsafe-call": 1,
    "@typescript-eslint/member-ordering": 1,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-magic-numbers": 0,
    "@typescript-eslint/no-unnecessary-condition": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/unbound-method": 1,
    "@typescript-eslint/typedef": 1,
    "@typescript-eslint/prefer-readonly-parameter-types": 1,
    "@typescript-eslint/explicit-module-boundary-types": 1,
    "typescript-eslint/ban-ts-comment": 0,

    "react/jsx-handler-names": 1,
    "react/jsx-child-element-spacing": 1,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": "off",
    "react/static-property-placement": 0,
    "react/jsx-filename-extension": [0],
    "react/no-set-state": 'off',
    "react/jsx-no-literals": 'off',
    "react/jsx-max-depth": 'off',
    "react/jsx-wrap-multilines": 0,
    "react/button-has-type": 0,
    "react/sort-comp": 0,
    "react/function-component-definition": [0, {
      "namedComponents": "function-declaration" | "function-expression" | "arrow-function",
      "unnamedComponents": "function-expression" | "arrow-function"
    }],
  },
  settings: {
    "html/html-extensions": [".html"],
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
