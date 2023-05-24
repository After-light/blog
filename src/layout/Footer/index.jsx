import React from 'react';
import myWeChat from '@@share/images/myWeChat.jpg';
import logo from '@@share/images/logo.png';

import netInfo from './netInfo';

import styles from './index.less';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.netInfo}>
        <img className={styles.logo} src={logo} alt="logo" />
        <span>© 2023</span>
        {netInfo.map(({ key, content, ...resetProps }) => (
          <a className="link" key={key} {...resetProps}>
            {content}
          </a>
        ))}
      </div>
      <div className={styles.myWeChatWrapper}>
        <img src={myWeChat} alt="我的微信" />
        <div>扫码加我微信</div>
      </div>
    </div>
  );
}

export default Footer;
