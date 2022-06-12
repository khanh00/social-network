import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Grid from '../../components/ui/Grid';
import Navigation from '../../components/Navigation';
import FriendCard from '../../components/FriendCard';
import * as api from '../../api';
import style from './Friends.module.scss';
import { useAuth } from '../../contexts/authContext';

function Friends() {
  const [users, setUsers] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const { data, error } = await api.getUsers(`_id[ne]=${currentUser._id}`);
      if (error) return console.log(error.message);
      setUsers(data.users);
    })();
  }, [currentUser._id]);

  return (
    <>
      <Header />
      <Grid.Container>
        <Grid.Item column="1-3">
          <Navigation />
        </Grid.Item>

        <Grid.Item column="3-13">
          <main>
            <ul className={style.list}>
              {users &&
                users.map((user) => <FriendCard key={user._id} user={user} />)}
            </ul>
          </main>
        </Grid.Item>
      </Grid.Container>
    </>
  );
}

export default Friends;
