import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Tree } from 'antd';

import buildTreeNode from './buildTreeNode';
import buildMarkdownTree from './buildMarkdownTree';

import styles from './index.less';

function MarkdownTree({ title, content }) {
  const [markdownTree, setMarkdownTree] = useState([]);

  useEffect(() => {
    if (title && content) {
      setMarkdownTree(buildMarkdownTree({ title, content }));
    }
  }, [title, content]);

  return markdownTree.length ? (
    <Tree
      className={classnames(styles.markdownTree, 'scrollbar')}
      treeData={buildTreeNode(markdownTree)}
      autoExpandParent={true}
      defaultExpandAll={true}
    />
  ) : null;
}

export default React.memo(MarkdownTree);
