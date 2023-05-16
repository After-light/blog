import React from 'react';
import { Carousel } from 'antd';

import styles from './index.less';

function RotationChart({ charts = [] }) {
  const renderChart = ({ key, content }) => (
    <div className={styles.imgWrapper} key={key}>
      <div
        className={styles.img}
        style={{
          backgroundImage: `url(${content})`,
        }}
      />
    </div>
  );

  return (
    <Carousel className={styles.rotationChart} autoplay dotPosition="left" dots={false}>
      {charts.map(renderChart)}
    </Carousel>
  );
}

export default RotationChart;
