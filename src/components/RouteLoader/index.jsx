import React from 'react';
import { Routes, Route } from 'react-router-dom';

function RouteLoader({ navList, createElement }) {
  const renderBody = (item) => {
    const { key, href } = item;

    return <Route key={key} path={href} element={createElement(item)} />;
  };

  return <Routes>{navList.map(renderBody)}</Routes>;
}

export default RouteLoader;
