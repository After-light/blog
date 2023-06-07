import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './index.less';
import { throttle } from 'lodash';

function VideoPlayer({ src, playCallback }) {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);

  const onToggle = (status, handle) => {
    playCallback(status);
    setTimeout(handle);
    setPlaying(status);
  };

  const onPlay = () => {
    onToggle(true, () => {
      videoRef.current.muted = false;
      videoRef.current.play();
    });
  };

  const onPause = () => {
    onToggle(false, () => {
      videoRef.current.muted = true;
      videoRef.current.pause();
    });
  };

  const onScroll = throttle(() => {
    if (!videoRef.current.muted) {
      onPause();
    }
  }, 300);

  useEffect(() => {
    document.querySelector('.scrollbar').addEventListener('scroll', onScroll);

    return () => {
      document.querySelector('.scrollbar').removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={styles.videoPlayer}>
      <video ref={videoRef} className={styles.video} src={src} loop muted />
      <div
        className={classNames(styles.mask, { [styles.pause]: playing })}
        onClick={() => (playing ? onPause() : onPlay())}
      ></div>
    </div>
  );
}

export default React.memo(VideoPlayer);
