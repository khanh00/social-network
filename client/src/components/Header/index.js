import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import Search from '../Search';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import ListItem from '../ui/ListItem';
import style from './Header.module.scss';
import {
  IoPersonOutline,
  IoCogOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { useClickOutside } from '../../utils';
import PostCreate from '../PostCreate';

function Header() {
  const [isHiddenUserDropdown, setIsHiddenUserDropdown] = useState(true);
  const [isHiddenNotifDropdown, setIsHiddenNotifDropdown] = useState(true);
  const [isHiddenPostCreate, setIsHiddenPostCreate] = useState(true);

  const userEl = useRef(null);
  const notifEl = useRef(null);

  useClickOutside(userEl, () => setIsHiddenUserDropdown(true));
  useClickOutside(notifEl, () => setIsHiddenNotifDropdown(true));

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.left}>
          <Logo />
          <Search />
        </div>

        <div className={style.right}>
          <Button.Default onClick={() => setIsHiddenPostCreate(false)}>
            Bài viết mới
          </Button.Default>
          {!isHiddenPostCreate && (
            <PostCreate
              setIsHidden={(isHidden) => setIsHiddenPostCreate(isHidden)}
            />
          )}

          {/* Notification */}
          <button
            ref={notifEl}
            className={style.notif}
            onClick={() => setIsHiddenNotifDropdown(!isHiddenNotifDropdown)}
          >
            <div className={style.icon}>
              <IoNotificationsOutline />
            </div>
            <ul
              className={clsx(style.notifList, {
                [style.hidden]: isHiddenNotifDropdown,
              })}
            >
              <li>Không có thông báo</li>
            </ul>
          </button>

          {/* User */}
          <button
            ref={userEl}
            className={style.user}
            onClick={() => setIsHiddenUserDropdown(!isHiddenUserDropdown)}
          >
            <div className={style.icon}>
              <IoPersonOutline />
            </div>
            <ul
              className={clsx(style.userAction, {
                [style.hidden]: isHiddenUserDropdown,
              })}
            >
              <ListItem.Link
                to="/"
                left={{ icon: <IoPersonOutline /> }}
                right="Trang cá nhân"
              />
              <ListItem.Link
                to="/"
                left={{ icon: <IoCogOutline /> }}
                right="Tài khoản"
              />
              <hr />
              <ListItem.Link
                to="/"
                left={{ icon: <IoLogOutOutline /> }}
                right="Đăng xuất"
              />
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
