import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Space } from 'antd';

import chatImg from '@@share/images/myWeChat.jpg';
import { getArticles } from './actions';

import styles from './index.less';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles().then((data) => {
      setArticleList(data);
    });
  }, []);

  const createTitleNode = (title, href) => {
    return (
      <a className="link" onClick={() => navigate(href)}>
        {title}
      </a>
    );
  };

  const createActions = (actions) => {
    return actions.map(({ actionName, ...resetProps }, index) => (
      <IconText
        key={`${actionName}_${index}`}
        className={styles[`icon_${actionName}`]}
        {...resetProps}
      />
    ));
  };

  const renderArticle = ({ id, href, title, createTime, content, actions }) => {
    return (
      <List.Item
        key={title}
        className={styles.articleItem}
        actions={createActions(actions)}
        extra={<img width={120} alt="logo" src={chatImg} />}
      >
        <List.Item.Meta title={createTitleNode(title, `${href}/${id}`)} description={createTime} />
        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: content }} />
      </List.Item>
    );
  };

  return (
    <div className={styles.articleList}>
      <div className={styles.title}>LAST POSTS</div>
      <div className={styles.info}>最新的文章</div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={articleList}
        renderItem={renderArticle}
      ></List>
    </div>
  );
}

export default ArticleList;
