import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import getRandomImage from './getRandomImage';

import styles from './index.less';

const ArticleExtra = ({ href }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.articleExtra}>
      <div className={styles.articleImg} style={{ backgroundImage: `url(${getRandomImage()})` }} />
      <Button onClick={() => navigate(href)}>阅读全文</Button>
    </div>
  );
};

export default ArticleExtra;
