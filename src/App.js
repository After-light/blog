import React from "react";
import Header from "@@/layout/Header";
import Body from "@@/layout/Body";
import Footer from "@@/layout/Footer";

import navList from "./navList";

function App() {
  return (
    <div className="App">
      <Header navList={navList} />
      <Body navList={navList} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
