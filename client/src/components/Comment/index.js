import React from 'react';
import PropTypes from 'prop-types';

import style from './Comment.module.scss';
import { displayTime } from '../../utils';

function Comment({ comment: { text, image, createdAt, updatedAt, author } }) {
  return (
    <li className={style.wrapper}>
      <div className={style.avatar}>
        <img src={author.avatar} alt="avatar" />
      </div>
      <div className={style.right}>
        <div className={style.comment}>
          <div className={style.fullName}>{author.fullName}</div>
          {text && <p>{text}</p>}
          {image && (
            <div>
              <img src={image} alt="comment" />
            </div>
          )}
        </div>
        <div className={style.action}>
          <div>Thích</div>⋅<div>Phản hồi</div>⋅{' '}
          {displayTime(createdAt, updatedAt)}
        </div>
        {/* <div>phan hoi</div> */}
      </div>
    </li>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
