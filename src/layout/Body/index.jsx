import React from 'react';
import asyncComponent from '@@share/decorator/asyncComponent';
import classnames from 'classnames';

import BodyWrapper from '../BodyWrapper';
import BodyWrapperHeadless from '../BodyWrapperHeadless';
import Footer from '../Footer';
import RouteLoader from '@@components/RouteLoader';

import styles from './index.less';

function Body({ navList }) {
  const createElement = ({ componentWrapper: LayoutWrapper, importComponent }) => {
    return <LayoutWrapper>{asyncComponent(importComponent)}</LayoutWrapper>;
  };

  return (
    <div className={classnames(styles.body, 'scrollbar')}>
      <RouteLoader navList={navList} createElement={createElement} />
      <Footer />
    </div>
  );
}

export default Body;
