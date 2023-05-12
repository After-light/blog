import React from 'react';

import styles from './index.less';

function BodyWrapper({ children }) {
  return <div className={styles.bodyWrapper}>{children}</div>;
}

export default BodyWrapper;
