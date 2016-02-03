import React from 'react';

import styles from './_hello-world.scss';

export default () => (
  <div className="hello-world">
    <div className={styles['hello-world__icon']}></div>
    Hello, World
  </div>
);
