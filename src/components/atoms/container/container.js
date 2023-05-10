// @flow
import * as React from 'react';

import style from './container.module.css';

function Container({ children }): React$Element<'div'> {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
}

export default Container;
