import React from 'react';
import Header from '@@layout/Header';
import Body from '@@layout/Body';

import navList from './navList';

function App() {
  return (
    <div className="App">
      <Header navList={navList} />
      <Body navList={navList} />
    </div>
  );
}

export default App;
