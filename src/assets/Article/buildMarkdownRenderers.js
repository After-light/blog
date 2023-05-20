import React from 'react';
import hljs from 'highlight.js';

import { createCopyEventCallback } from '@@share/js/utils';

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

const renderCopyButton = ({ children }) => {
  return (
    <div key="copyButton" className={styles.copyWrapper}>
      <div title="复制" className={styles.copyImg} onClick={createCopyEventCallback(children[0])} />
    </div>
  );
};

const renderHightLightCode = ({ className, children }) => {
  const language = className?.replace(/language-/, '') || 'js';
  const hljsLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  const text = children[0];
  const htmlContent = hljs.highlight(hljsLanguage, text).value;

  return (
    <pre key="code" className={styles.code}>
      <code dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </pre>
  );
};

export default {
  code: (nodeProps) => {
    return <>{[renderCopyButton(nodeProps), renderHightLightCode(nodeProps)]}</>;
  },
  h2: addId,
  h3: addId,
  h4: addId,
  h5: addId,
  h6: addId,
};
