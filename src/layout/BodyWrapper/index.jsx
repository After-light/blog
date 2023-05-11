import React from "react";
import classnames from "classnames";

import styles from "./index.less";

function BodyWrapper({ children }) {
  return (
    <div className={classnames(styles.bodyWrapper, "scrollbar")}>
      {children}
    </div>
  );
}

export default BodyWrapper;
