import React from 'react';

import styles from './index.less';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.netInfo}>
        <div>
          <span>© 2022-2023</span>
          <span>LeeRo</span>
        </div>
        <div>Lee_ro@163.com</div>
      </div>
      <div className={styles.aboutMe}>
        <img src="@@/images/vx.jpg" alt="我的微信" />
      </div>
    </div>
  );
}

export default Footer;
