import React, { useEffect, useState } from 'react';
import style from './FriendCard.module.scss';
import PropTypes from 'prop-types';
import * as api from '../../api';
import { useAuth } from '../../contexts/authContext';

function FriendCard({ user }) {
  const auth = useAuth();
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await api.getCurrentUser();
      if (error) console.log(error);
      const { friends } = data.user;
      setIsFriend(friends.some((userId) => userId === user._id));
    })();
  }, [user._id]);

  const handleAddFriend = (event) => {
    event.preventDefault();
    const { error } = api.updateUser(auth.currentUser, {
      $push: { friends: user._id },
    });
    if (error) return console.log(error.message);
    setIsFriend(true);
  };

  const handleUnFriend = (event) => {
    event.preventDefault();
    const { error } = api.updateUser(auth.currentUser, {
      $pull: { friends: user._id },
    });
    if (error) return console.log(error.message);
    setIsFriend(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.avatar}>
        <img src={user.avatar} alt={user.avatar} />
      </div>
      <div className={style.fullName}>{user.fullName}</div>
      {isFriend && (
        <button className={style.buttonUnFriend} onClick={handleUnFriend}>
          Hủy kết bạn
        </button>
      )}
      {!isFriend && (
        <button className={style.buttonAddFriend} onClick={handleAddFriend}>
          Kết bạn
        </button>
      )}
    </div>
  );
}

FriendCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default FriendCard;
