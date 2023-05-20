/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

import MarkdownTree from '@@components/MarkdownTree';

import { getArticleById } from '../common/actions';
import renderers from './buildMarkdownRenderers';

import styles from './index.less';

function Article() {
  const { id } = useParams();
  const [articleDetail, setArticleDetail] = useState({ title: '', content: '' });

  useEffect(() => {
    getArticleById(id).then((data) => setArticleDetail(data));
  }, []);

  return (
    <div className={classnames(styles.article, styles.markdownContainer)}>
      <div className={styles.articleDetail}>
        <h1 id={articleDetail.title?.trim()} className={styles.articleTitle}>
          {articleDetail.title}
        </h1>
        <ReactMarkdown
          children={articleDetail.content}
          components={renderers}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
      <div className={styles.markdownTreeContainer}>
        <MarkdownTree title={articleDetail.title} content={articleDetail.content} />
      </div>
    </div>
  );
}

export default Article;
