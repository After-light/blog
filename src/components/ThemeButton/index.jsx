import React, { useState } from 'react';
import { theme } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

import { changeTheme, getNextTheme } from '@@share/theme';

import styles from './index.less';

function ThemeButton() {
  const { token } = theme.useToken();
  const [btnFillColor, setBtnFillColor] = useState(token[getNextTheme()]);

  const onChangeTheme = () => {
    changeTheme();

    setTimeout(() => {
      setBtnFillColor(token[getNextTheme()]);
    });
  };

  return (
    <div className={styles.themeButton} onClick={onChangeTheme}>
      <BgColorsOutlined style={{ fontSize: '20px', color: btnFillColor }} />
    </div>
  );
}

export default ThemeButton;
