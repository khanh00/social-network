import React, { useEffect, useState } from 'react';

import * as api from '../../api';
import { useAuth } from '../../contexts/authContext';
import ListItem from '../ui/ListItem';
import { useSocket } from '../../contexts/socketContext';
import style from './OnlineRecently.module.scss';

function OnlineRecently() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [usersStatus, setUsersStatus] = useState({ on: [], off: [] });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await api.getUsers();
      if (error) return console.log(error);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('users online', (usersOnline) => {
      const on = [];
      const off = [];

      users.forEach((user) => {
        if (Object.values(usersOnline).includes(user._id)) {
          if (user._id !== currentUser._id) on.push(user);
        } else off.push(user);
      });
      setUsersStatus({ on, off });
    });

    return () => {
      socket.off('users online');
    };
  }, [currentUser._id, socket, users]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Online gần đây</div>
      <ul>
        {usersStatus.on.map((user) => (
          <ListItem.Link
            to="#"
            left={{ image: <img src={user.avatar} alt={user.fullName} /> }}
            right={user.fullName}
            key={user._id}
            on
          />
        ))}
        {usersStatus.off.map((user) => (
          <ListItem.Link
            to="#"
            left={{ image: <img src={user.avatar} alt={user.fullName} /> }}
            right={user.fullName}
            key={user._id}
            off
          />
        ))}
      </ul>
    </div>
  );
}

export default OnlineRecently;
