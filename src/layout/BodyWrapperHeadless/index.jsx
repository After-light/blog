import React from "react";

import styles from "./index.less";

function BodyWrapperHeadless({ children }) {
  return <div className={styles.bodyWrapperHeadless}>{children}</div>;
}

export default BodyWrapperHeadless;
