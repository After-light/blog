// 屏幕分辨率--->字体大小
const FONT_SIZE_MAP = {
  900: 12,
  1500: 14,
  1920: 16,
};

export default () => {
  const { width } = window.screen;

  const screen = Object.keys(FONT_SIZE_MAP).find((key) => width < key) || 1920;

  return FONT_SIZE_MAP[screen];
};
