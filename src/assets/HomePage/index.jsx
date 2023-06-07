import React, { useState } from 'react';
import classNames from 'classnames';

import VideoPlayer from '@@components/VideoPlayer';
import coverVideo from '@@share/videos/cover.mp4';

import ArticleList from '../ArticleList';

import styles from './index.less';

function HomePage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className={styles.homePage}>
      <VideoPlayer src={coverVideo} playCallback={(playing) => setVideoPlaying(playing)} />
      <main className={classNames(styles.main, { [styles.videoPlaying]: videoPlaying })}>
        <ArticleList />
      </main>
    </div>
  );
}

export default HomePage;
