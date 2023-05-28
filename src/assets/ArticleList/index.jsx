import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Space, Button } from 'antd';
import classnames from 'classnames';

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
      <div className={classnames(styles.articleTitle, 'link')} onClick={() => navigate(href)}>
        {title}
      </div>
    );
  };

  const renderActions = (actions) => {
    return actions.map(({ actionName, ...resetProps }, index) => (
      <IconText key={`${actionName}_${index}`} className={styles.iconText} {...resetProps} />
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

  const renderContent = (content) => {
    const contentList = content.split('\r\n');
    return (
      <div>
        {contentList.map((text, index) => (
          <Fragment key={index}>
            {<span>{text}</span>}
            {index !== contentList.length - 1 && <br />}
          </Fragment>
        ))}
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
        {renderContent(content)}
      </List.Item>
    );
  };

  return (
    <div className={styles.list}>
      <div className={styles.listTitle}>LATEST POSTS</div>
      <div className={styles.listInfo}>最新的文章</div>
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
