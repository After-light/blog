import React from 'react'
import asyncComponent from '@@/decorator/asyncComponent'
import { Routes, Route } from 'react-router-dom'

import BodyWrapper from '../BodyWrapper'
import BodyWrapperHeadless from '../BodyWrapperHeadless'

import styles from './index.less'

function Body({ navList }) {
  const getLayoutWrapper = (mode) =>
    ({
      headMode: BodyWrapper,
      headlessMode: BodyWrapperHeadless,
    }[mode])

  const renderBody = ({ key, href, mode, component }) => {
    const LayoutWrapper = getLayoutWrapper(mode)

    return (
      <Route
        key={key}
        path={href}
        element={<LayoutWrapper>{asyncComponent(component)}</LayoutWrapper>}
      />
    )
  }

  return (
    <div className={styles.body}>
      <Routes>{navList.map(renderBody)}</Routes>
    </div>
  )
}

export default Body
