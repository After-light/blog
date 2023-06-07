import React from 'react';
import { List } from 'antd';

import ArticleActions from './ArticleActions';
import ArticleContent from './ArticleContent';
import ArticleExtra from './ArticleExtra';
import ArticleTitle from './ArticleTitle';

import styles from './index.less';

const ArticleCard = ({ id, href, title, createTime, content, actions }) => {
  return (
    <List.Item
      key={id}
      className={styles.articleCard}
      actions={<ArticleActions actions={actions} />}
      extra={<ArticleExtra href={href} />}
    >
      <List.Item.Meta title={<ArticleTitle title={title} href={href} />} description={createTime} />
      <ArticleContent content={content} />
    </List.Item>
  );
};

export default ArticleCard;
