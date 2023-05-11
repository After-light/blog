import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

import { pathToKey } from "./utils";

import styles from "./index.less";

function NavigatorBar({ navList }) {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();

  useEffect(() => {
    const key = pathToKey(location.pathname);
    setSelectedKey(key);
  }, [location.pathname]);

  return (
    <div className={styles.navigatorBar}>
      <div className={styles.logo}>
        <Link to="/">李瑞的博客</Link>
      </div>
      <div className={styles.links}>
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
