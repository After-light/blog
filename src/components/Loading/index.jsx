import React from 'react';
import { Spin } from 'antd';

import styles from './index.less';

function Loading({ containerStyles }) {
  return (
    <div className={styles.loading} style={containerStyles}>
      <Spin />
    </div>
  );
}

export default Loading;
