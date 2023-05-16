import React from 'react';
import classnames from 'classnames';

import Footer from '../Footer';
import RouteLoader from '@@components/RouteLoader';

import styles from './index.less';

function Main({ navList }) {
  return (
    <div className={classnames(styles.main, 'scrollbar')}>
      <RouteLoader navList={navList} />
      <Footer />
    </div>
  );
}

export default Main;
