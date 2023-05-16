import React from 'react';
import Header from '@@layout/Header';
import Main from '@@layout/Main';

import navList from './navList';

function App() {
  return (
    <div className="App">
      <Header navList={navList} />
      <Main navList={navList} />
    </div>
  );
}

export default App;
