import React from 'react'
import { Carousel } from 'antd'

import styles from './index.less'

function RotationChart({ charts = [] }) {
  return (
    <Carousel className={styles.rotationChart} autoplay dotPosition="left" dots={false}>
      {charts.map(({ key, content }) => (
        <div className={styles.imgWrapper} key={key}>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${content})`,
            }}
          />
        </div>
      ))}
    </Carousel>
  )
}

export default RotationChart
