import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { pathToKey } from './utils';
import { useNavAnimation } from '@@share/hooks';

import styles from './index.less';

function NavigatorBar({ navList }) {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();

  const linksRef = useRef();
  useNavAnimation(linksRef);

  useEffect(() => {
    const key = pathToKey(location.pathname);
    setSelectedKey(key);
  }, [location.pathname]);

  return (
    <div className={styles.navigatorBar}>
      <div className={styles.logo}>
        <Link to="/"></Link>
      </div>
      <div className={styles.links} ref={linksRef}>
        {navList
          .filter(({ name }) => name)
          .map(({ key, name, href }) => (
            <Link
              className={classnames({
                [styles.selected]: key === selectedKey,
              })}
              key={key}
              to={href}
              onClick={() => setSelectedKey(key)}
            >
              {name}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default NavigatorBar;
