import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../../../api';
import Comment from '../../Comment';
import style from './Comments.module.scss';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await api.getComments(`post=${postId}`);
      if (error) console.log(error.message);
      setComments(data.comments);
    })();
  }, [postId]);

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