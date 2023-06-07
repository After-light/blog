import React from 'react';
import { Space } from 'antd';

import styles from './index.less';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ArticleActions = ({ actions }) => {
  return actions.map(({ actionName, ...resetProps }, index) => (
    <IconText key={`${actionName}_${index}`} className={styles.iconText} {...resetProps} />
  ));
};

export default ArticleActions;
