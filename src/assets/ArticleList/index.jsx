import React, { useEffect, useState } from 'react';
import { List } from 'antd';

import Loading from '@@components/Loading';

import ArticleCard from '../ArticleCard';
import { getArticleList } from '../common/actions';

import styles from './index.less';

function ArticleList() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticleList().then((data) => {
      setArticleList(data);
    });
  }, []);

  const renderList = (articleList) => {
    return (
      <List
        className={styles.cardList}
        itemLayout="vertical"
        size="large"
        dataSource={articleList}
        renderItem={(props) => <ArticleCard {...props} />}
      ></List>
    );
  };

  const LoadingReactNode = <Loading containerStyles={{ height: '50vh' }} />;

  return (
    <div className={styles.articleList}>
      <div className={styles.articleListTitleEn}>LATEST POSTS</div>
      <div className={styles.articleListTitleZh}>最新的文章</div>
      {!!articleList.length ? renderList(articleList) : LoadingReactNode}
    </div>
  );
}

export default ArticleList;
