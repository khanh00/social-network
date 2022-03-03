import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../../../api';
import Comment from '../../Comment';
import style from './Comments.module.scss';
import { useSocket } from '../../../contexts/socketContext';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    (async () => {
      const { data, error } = await api.getComments(`post=${postId}`);
      if (error) return console.log(error.message);
      setComments(data.comments);
    })();
  }, [postId]);

  useEffect(() => {
    socket.on('change comments', (comments) => {
      setComments(comments);
    });
    return () => {
      socket.off('change comments');
    };
  }, [socket, comments]);

  return (
    comments.length > 0 && (
      <ul className={style.wrapper}>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </ul>
    )
  );
}

Comments.propTypes = {
  postId: PropTypes.string,
};

export default Comments;
