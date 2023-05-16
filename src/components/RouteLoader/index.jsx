import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from '../Loading';

function RouteLoader({ navList }) {
  const renderBody = ({ key, href, componentWrapper: LayoutWrapper, importComponent }) => {
    const LazyComponent = lazy(importComponent);

    const routeElement = (
      <LayoutWrapper>
        <LazyComponent />
      </LayoutWrapper>
    );

    return <Route key={key} path={href} element={routeElement} />;
  };

  return (
    <Suspense fallback={<Loading containerStyles={{ height: '600px' }} />}>
      <Routes>{navList.map(renderBody)}</Routes>
    </Suspense>
  );
}

export default RouteLoader;
