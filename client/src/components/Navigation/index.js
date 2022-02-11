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
        <ListItem.Link to="/" left={{ icon: <IoHomeOutline /> }} right="Trang chủ" active />
        <ListItem.Link to="/" left={{ icon: <IoPersonAddOutline /> }} right="Bạn bè" />
        <ListItem.Link to="/" left={{ icon: <IoPeopleOutline /> }} right="Nhóm" />
        <ListItem.Link to="/" left={{ icon: <IoChatboxEllipsesOutline /> }} right="Nhắn tin" />
        <ListItem.Link to="/" left={{ icon: <IoSettingsOutline /> }} right="Cài đặt" />
      </ul>
    </nav>
  );
}

export default Navigation;