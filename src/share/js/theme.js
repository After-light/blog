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
  const theme = document.querySelector('#root')?.getAttribute('theme') || THEME_MAP[0];
  const currentThemeIndex = THEME_MAP.indexOf(theme);
  return THEME_MAP[(currentThemeIndex + 1) % THEME_MAP.length];
};

export const changeTheme = () => {
  const root = document.querySelector('#root');
  const nextTheme = getNextTheme();
  root.setAttribute('theme', nextTheme);
};
