import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classnames from 'classnames';

import Loading from '../Loading';
import { downloadImageSync, isUrl } from '@@share/js/utils';

import styles from './index.less';
import { Tooltip } from 'antd';

function ImageModal({ imgUrl, imageName, closeModal }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const originalView = () => {
    window.open(imgUrl, '_blank');
  };

  const download = () => {
    setDownloading(true);
    downloadImageSync(imgUrl, 'image.jpg').then(() => setDownloading(false));
  };

  const renderFooter = (
    <div className={styles.buttonGroup}>
      <Button type="primary" onClick={originalView}>
        查看原图
      </Button>
      <Tooltip placement="top" title={isUrl(imgUrl) ? '网络图片不支持下载' : ''}>
        <Button type="primary" loading={downloading} disabled={isUrl(imgUrl)} onClick={download}>
          下载
        </Button>
      </Tooltip>
      <Button onClick={closeModal}>取消</Button>
    </div>
  );

  return (
    <Modal
      open={true}
      title={imageName}
      className={styles.imageModal}
      footer={renderFooter}
      onCancel={closeModal}
    >
      <div className={classnames(styles.imageContainer, 'scrollbar')}>
        {imageLoading && <Loading containerStyles={{ height: '65vh' }} />}
        <img src={imgUrl} alt="暂无图片" onLoad={() => setImageLoading(false)} />
      </div>
    </Modal>
  );
}

export default ImageModal;
