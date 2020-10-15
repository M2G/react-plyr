module.exports = {
  presets: [
    [
      'babel-preset-airbnb',
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
        }],
      "@babel/preset-react",
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};
