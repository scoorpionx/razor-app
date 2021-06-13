module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  extends: ["plugin:prettier/recommended"],
  plugins: [
    "prettier",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
  rules: {
    "prettier/prettier": "error",
  },
}
