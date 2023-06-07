import React, { Suspense, lazy } from 'react';
import classnames from 'classnames';
import { Routes, Route } from 'react-router-dom';

import styles from './index.less';

const createElement = ({ componentWrapper: LayoutWrapper, importComponent }) => {
  const LazyComponent = lazy(importComponent);

  return (
    <LayoutWrapper>
      <LazyComponent importComponent={importComponent} />
    </LayoutWrapper>
  );
};

function RoutingRenderer({ navList }) {
  const renderRoute = ({ key, href, ...resetProps }) => {
    return <Route key={key} path={href} element={createElement(resetProps)} />;
  };

  return (
    <div className={classnames(styles.routingRenderer, 'scrollbar')}>
      <Suspense fallback={<></>}>
        <Routes>{navList.map(renderRoute)}</Routes>
      </Suspense>
    </div>
  );
}

export default RoutingRenderer;
