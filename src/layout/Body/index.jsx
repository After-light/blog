import React from 'react';
import asyncComponent from '@@share/decorator/asyncComponent';
import { Routes, Route } from 'react-router-dom';
import classnames from 'classnames';

import BodyWrapper from '../BodyWrapper';
import BodyWrapperHeadless from '../BodyWrapperHeadless';
import Footer from '../Footer';

import styles from './index.less';

function Body({ navList }) {
  const getLayoutWrapper = (mode) =>
    ({
      headMode: BodyWrapper,
      headlessMode: BodyWrapperHeadless,
    }[mode]);

  const renderBody = ({ key, href, mode, component }) => {
    const LayoutWrapper = getLayoutWrapper(mode);

    return (
      <Route
        key={key}
        path={href}
        element={<LayoutWrapper>{asyncComponent(component)}</LayoutWrapper>}
      />
    );
  };

  return (
    <div className={classnames(styles.body, 'scrollbar')}>
      <Routes>{navList.map(renderBody)}</Routes>
      <Footer />
    </div>
  );
}

export default Body;
