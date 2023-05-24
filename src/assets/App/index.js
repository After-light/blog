import React from 'react';
import { theme } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

import Header from '@@layout/Header';
import Main from '@@layout/Main';
import { changeTheme, getNextTheme } from '@@share/theme';

import navList from './navList';

import styles from './index.less';

function AppView() {
  const { token } = theme.useToken();

  return (
    <div className="AppView">
      <Header navList={navList} />
      <Main navList={navList} />
      <div className={styles.themeButton} onClick={changeTheme}>
        <BgColorsOutlined style={{ fontSize: '20px', color: token[getNextTheme()] }} />
      </div>
    </div>
  );
}

export default React.memo(AppView);
