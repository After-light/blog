module.exports = {
  extends: ["plugin:react/recommended"],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    jsx: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "warn",
    "react/prop-types": "off",
  },
};
