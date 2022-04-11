import React from 'react';
import {
  IoHomeOutline,
  IoPersonAddOutline,
  IoPeopleOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

import style from './Navigation.module.scss';
import ListItem from '../ui/ListItem';

function Navigation() {
  return (
    <nav className={style.container}>
      <ul className={style.list}>
        <ListItem.Link
          to="/"
          left={{ icon: <IoHomeOutline /> }}
          right="Trang chủ"
          active={'/' === window.location.pathname}
        />
        <ListItem.Link
          to="/friends"
          left={{ icon: <IoPersonAddOutline /> }}
          right="Bạn bè"
          active={'/friends' === window.location.pathname}
        />
        <ListItem.Link
          to="/groups"
          left={{ icon: <IoPeopleOutline /> }}
          right="Nhóm"
          active={'/groups' === window.location.pathname}
        />
        <ListItem.Link
          to="/messages"
          left={{ icon: <IoChatboxEllipsesOutline /> }}
          right="Nhắn tin"
          active={'/messages' === window.location.pathname}
        />
        <ListItem.Link
          to="/settings"
          left={{ icon: <IoSettingsOutline /> }}
          right="Cài đặt"
          active={'/settings' === window.location.pathname}
        />
      </ul>
    </nav>
  );
}

export default Navigation;
