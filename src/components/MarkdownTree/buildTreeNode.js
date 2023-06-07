import React from 'react';
import styles from './index.less';

const scrollToTarget = (target) => () => {
  var targetDom = document.getElementById(`${target}`);

  // DOM元素平滑滚动至视口中间位置
  targetDom?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const buildTreeNode = (markdownTree) => {
  return markdownTree.map((node) => {
    let children = [];

    if (node.children.length) {
      children = buildTreeNode(node.children);
    }

    const title = <div onClick={scrollToTarget(node.title)}>{node.title}</div>;

    return {
      ...node,
      title,
      children,
    };
  });
};

export default buildTreeNode;
