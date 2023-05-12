import React from 'react';

import NavigatorBar from '@@components/NavigatorBar';

import styles from './index.less';

function Header({ navList }) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <NavigatorBar navList={navList} />
      </div>
    </div>
  );
}

export default Header;
