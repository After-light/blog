import React from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import styles from './index.less';

const ArticleTitle = ({ title, href }) => {
  const navigate = useNavigate();

  return (
    <div className={classnames(styles.articleTitle, 'link')} onClick={() => navigate(href)}>
      {title}
    </div>
  );
};

export default ArticleTitle;
