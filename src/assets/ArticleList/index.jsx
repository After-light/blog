import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Space, Button } from 'antd';

import chatImg from '@@share/images/myWeChat.jpg';
import { getArticleList } from '../common/actions';

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
    getArticleList().then((data) => {
      setArticleList(data);
    });
  }, []);

  const renderTitle = (title, href) => {
    return (
      <div className="link" onClick={() => navigate(href)}>
        {title}
      </div>
    );
  };

  const renderActions = (actions) => {
    return actions.map(({ actionName, ...resetProps }, index) => (
      <IconText
        key={`${actionName}_${index}`}
        className={styles[`icon_${actionName}`]}
        {...resetProps}
      />
    ));
  };

  const renderExtra = (href) => {
    return (
      <div className={styles.extra}>
        <img alt="logo" src={chatImg} />
        <Button onClick={() => navigate(href)}>阅读全文</Button>
      </div>
    );
  };

  const renderArticle = ({ id, href, title, createTime, content, actions }) => {
    return (
      <List.Item
        key={id}
        className={styles.articleItem}
        actions={renderActions(actions)}
        extra={renderExtra(href)}
      >
        <List.Item.Meta title={renderTitle(title, href)} description={createTime} />
        <pre>{content}</pre>
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
