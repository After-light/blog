import { theme } from 'antd';

export const THEME_MAP = [
  'blue',
  'purple',
  'cyan',
  'green',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
];

export const getNextTheme = () => {
  const theme = document.querySelector('div[theme]')?.getAttribute('theme') || THEME_MAP[0];
  const currentThemeIndex = THEME_MAP.indexOf(theme);
  return THEME_MAP[(currentThemeIndex + 1) % THEME_MAP.length];
};

export const changeTheme = () => {
  const root = document.querySelector('div[theme]');
  const nextTheme = getNextTheme();
  root.setAttribute('theme', nextTheme);
};

export default (themeColor) => ({
  token: {
    colorPrimary: themeColor, // 主题色
  },
  algorithm: theme.defaultAlgorithm, // 预设算法 默认(defaultAlgorithm) 暗色(darkAlgorithm) 紧凑(compactAlgorithm)
});
