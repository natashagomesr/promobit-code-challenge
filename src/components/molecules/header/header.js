// @flow
import * as React from 'react';
import Container from '../../atoms/container/container';

import style from './header.module.css';

function Header(): React$Element<'header'> {
  return (
    <header className={style.header}>
      <Container>
        <img src="/assets/images/logo.svg" alt="logo" />
      </Container>
    </header>
  );
}

export default Header;
