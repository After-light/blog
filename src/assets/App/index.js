import React from 'react';

import RoutingRenderer from '@@components/RoutingRenderer';
import ThemeButton from '@@components/ThemeButton';

import navList from './navList';

function App() {
  return (
    <div className="app">
      <RoutingRenderer navList={navList} />
      <ThemeButton />
    </div>
  );
}

export default React.memo(App);
