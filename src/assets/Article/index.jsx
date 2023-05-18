/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';

import { getArticleById } from '../common/actions';
import { createCopyEventCallback } from '@@share/js/utils';

import styles from './index.less';

function Article() {
  const { id } = useParams();
  const [articleDetail, setArticleDetail] = useState({ title: '', content: '' });

  useEffect(() => {
    getArticleById(id).then((data) => setArticleDetail(data));
  }, []);

  // 自定义渲染器：为标题添加 id 属性
  const renderers = {
    code: ({ className, children }) => {
      const language = className?.replace(/language-/, '') || 'js';
      const hljsLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      const text = children[0];

      const htmlContent = hljs.highlight(hljsLanguage, text).value;

      return (
        <>
          <div className={styles.copyWrapper}>
            <div title="复制" className={styles.copyImg} onClick={createCopyEventCallback(text)} />
          </div>
          <pre className={styles.code}>
            <code dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </pre>
        </>
      );
    },
  };

  return (
    <div className={classnames(styles.article, styles.markdownContainer)}>
      <h1 className={styles.articleTitle}>{articleDetail.title}</h1>
      <ReactMarkdown
        children={articleDetail.content}
        components={renderers}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  );
}

export default Article;
