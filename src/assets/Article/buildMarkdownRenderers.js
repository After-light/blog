import React from 'react';
import hljs from 'highlight.js';
import classnames from 'classnames';

import { createCopyEventCallback, isUrl } from '@@share/js/utils';

import styles from './index.less';

const getInterText = (target) => {
  const isObj = typeof target === 'object';

  return !isObj ? target : target?.props?.children?.[0];
};

const joinString = (result, target) => {
  result = result + getInterText(target);
  return result;
};

/**
 * 给标题加上id属性
 * case1: 标题中内嵌标签的场景
 * @param {Object} item
 * @returns
 */
const addId = (item) => {
  const { level, children } = item;

  const text = children.reduce(joinString, '')?.trim();

  return React.createElement(`h${level}`, { id: text }, text);
};

const renderCopyButton = ({ inline, children }) => {
  if (inline) {
    return null;
  }

  return (
    <div key="copyButton" className={styles.copyWrapper}>
      <div title="复制" className={styles.copyImg} onClick={createCopyEventCallback(children[0])} />
    </div>
  );
};

const renderHightLightCode = ({ inline, className, children }) => {
  const language = className?.replace(/language-/, '') || 'js';
  const hljsLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  const text = children[0];
  const htmlContent = hljs.highlight(hljsLanguage, text).value;

  const code = <code dangerouslySetInnerHTML={{ __html: htmlContent }} />;

  return React.createElement(
    inline ? 'span' : 'pre',
    { key: 'code', className: classnames(styles[inline ? 'codeInLine' : 'code'], 'scrollbar') },
    code
  );
};

const renderImageHandle = (openImageModal) => {
  let imageNumber = 0;

  const renderImage = ({ src = '', title = '' }) => {
    imageNumber++;
    const imgUrl = isUrl(src) ? src : `/api/${src}`;
    console.info(title);
    const imageName = `图 ${title?.split('.')?.shift() || imageNumber}`;
    return (
      <>
        <span
          className={styles.image}
          title={title}
          style={{ backgroundImage: `url(${imgUrl})` }}
          onClick={openImageModal({ imgUrl, imageName })}
        />
        <span className={styles.imageName}>{imageName}</span>
      </>
    );
  };
  return renderImage;
};

export default (openImageModal) => ({
  code: (nodeProps) => {
    return <>{[renderCopyButton(nodeProps), renderHightLightCode(nodeProps)]}</>;
  },
  h2: addId,
  h3: addId,
  h4: addId,
  h5: addId,
  h6: addId,
  img: renderImageHandle(openImageModal),
});
