import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { IoPersonOutline, IoCogOutline, IoLogOutOutline } from 'react-icons/io5';

import style from './User.module.scss';
import Icon from '../ui/Icon';
import ListItem from '../ui/ListItem';
import { useClickOutside } from '../../utils';

function User() {
  const [hidden, setHidden] = useState(true);
  const userEl = useRef(null);
  useClickOutside(userEl, () => setHidden(true));

  return (
    <button ref={userEl} className={style.wrapper} onClick={() => setHidden(!hidden)}>
      <Icon.Header>
        <IoPersonOutline />
      </Icon.Header>
      <ul className={clsx(style.actionUser, { [style.hidden]: hidden })}>
        <ListItem.Link to="/" left={{ icon: <IoPersonOutline /> }} right="Trang cá nhân" />
        <ListItem.Link to="/" left={{ icon: <IoCogOutline /> }} right="Tài khoản" />
        <hr />
        <ListItem.Link to="/" left={{ icon: <IoLogOutOutline /> }} right="Đăng xuất" />
      </ul>
    </button>
  );
}

export default User;
