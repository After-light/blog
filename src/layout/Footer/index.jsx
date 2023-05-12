import React from 'react';
import myWeChat from '@@share/images/myWeChat.jpg';

import styles from './index.less';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.netInfo}>
        <span>© 2022-2023</span>
        <a className="link" href="/">
          李瑞
        </a>
        <a className="link" href="void 0">
          Email
        </a>
      </div>
      <div className={styles.myWeChatWrapper}>
        <img src={myWeChat} alt="我的微信" />
        <div>扫码加我微信</div>
      </div>
    </div>
  );
}

export default Footer;
