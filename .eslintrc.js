module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    jsx: true,
  },
  settings: {
    react: {
      version: 'detect', // 自动获取已安装的 React 版本
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'warn',
    'react/prop-types': 'off',
  },
};
