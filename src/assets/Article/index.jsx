/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Divider } from 'antd';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

import MarkdownTree from '@@components/MarkdownTree';
import ImageModal from '@@components/ImageModal';

import { getArticleById } from '../common/actions';
import renderers from './buildMarkdownRenderers';

import styles from './index.less';

function Article() {
  const { id } = useParams();
  const [articleDetail, setArticleDetail] = useState({ title: '', content: '' });
  const [imageModalInfo, setImageModalInfo] = useState({
    showModal: false,
    imageInfo: {
      imgUrl: '',
      imageName: '',
    },
  });

  useEffect(() => {
    getArticleById(id).then((data) => setArticleDetail(data));
  }, []);

  const openImageModal = (imageInfo) => () => {
    setImageModalInfo({
      showModal: true,
      imageInfo,
    });
  };

  const closeImageModal = () => {
    setImageModalInfo({
      showModal: false,
      imageInfo: {
        imgUrl: '',
        imageName: '',
      },
    });
  };

  return (
    <div className={styles.article}>
      <div className={classnames(styles.articleDetail, styles.markdown)}>
        <h1 id={articleDetail.title?.trim()}>{articleDetail.title}</h1>
        <ReactMarkdown
          children={articleDetail.content}
          components={renderers(openImageModal)}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
      <Divider className={styles.divider} type="vertical" />
      <div className={styles.markdownTreeContainer}>
        <MarkdownTree title={articleDetail.title} content={articleDetail.content} />
      </div>
      {imageModalInfo.showModal && (
        <ImageModal {...imageModalInfo.imageInfo} closeModal={closeImageModal} />
      )}
    </div>
  );
}

export default Article;
