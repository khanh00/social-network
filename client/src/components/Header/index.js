import React from 'react';

import User from './User';
import Notification from './Notifications';
import Search from '../Search';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import style from './Header.module.scss';

function Header() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.left}>
          <Logo className={style.margin} />
          <Search />
        </div>
        <div className={style.right}>
          <Button.Default>Bài viết mới</Button.Default>
          <Notification />
          <User />
        </div>
      </div>
    </div>
  );
}

export default Header;
