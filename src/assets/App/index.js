import React from 'react';

import Header from '@@layout/Header';
import Main from '@@layout/Main';
import ThemeButton from '@@components/ThemeButton';

import navList from './navList';

function App() {
  return (
    <div className="app">
      <Header navList={navList} />
      <Main navList={navList} />
      <ThemeButton />
    </div>
  );
}

export default React.memo(App);
