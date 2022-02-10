import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  IoChatbubbleEllipsesOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { AiFillLike, AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';

import style from './Post.module.scss';
import Comments from './Comments';
import Hr from '../ui/Hr';
import { displayTime } from '../../utils';
import * as api from '../../api';
import { useAuth } from '../../contexts/authContext';
import CommentCreate from '../CommentCreate';

function Post({
  post: { _id, text, images, createdAt, updatedAt, author, comments, likes },
}) {
  const [isDisplayComments, setIsDisplayComments] = useState(false);
  const auth = useAuth();
  const [likeId, setLikeId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [numberOfLike, setNumberOfLiked] = useState(likes.length);

  useEffect(() => {
    (async () => {
      const user = await auth.user;
      const like = likes.find((like) => like.author === user._id);
      if (like) setLikeId(like._id);
      setLiked(!!like);
    })();
  }, [auth.user, likes]);

  const handleLike = async () => {
    if (liked) {
      const { error } = api.deleteLike(likeId);

      if (error) return console.log(error.message);

      setLiked(false);
      setNumberOfLiked((prev) => prev - 1);
    }

    if (!liked) {
      const author = await auth.user;
      const { data, error } = await api.createLike({
        type: 'like',
        post: _id,
        author: author._id,
      });

      if (error) return console.log(error.message);

      setLikeId(data._id);
      setLiked(true);
      setNumberOfLiked((prev) => prev + 1);
    }
  };

  const handleComment = () => {
    setIsDisplayComments(true);
    document.querySelector('#comment').focus();
  };

  return (
    <li className={style.wrapper}>
      <div className={style.post}>
        {/* Author */}
        <div className={style.author}>
          <div className={style.authorAvatar}>
            <img src={author.avatar} alt="avatar" />
          </div>
          <div>
            <div className={style.authorFullName}>{author.fullName}</div>
            <div className={style.time}>
              {displayTime(createdAt, updatedAt)}
            </div>
          </div>
        </div>

        {text && (
          <div className={style.text}>
            <p>{text}</p>
          </div>
        )}

        {images && (
          <div className={style.image}>
            {images.map((image) => (
              <img src={image} alt="post" key={image} />
            ))}
          </div>
        )}

        {/* Status */}
        <div className={style.status}>
          <div className={style.statusLike}>
            <div className={style.statusIcon}>
              <AiTwotoneLike />
            </div>
            {numberOfLike}
          </div>

          <button
            className={style.statusComment}
            onClick={() => setIsDisplayComments(!isDisplayComments)}
          >
            {comments.length} bình luận
          </button>
        </div>
      </div>

      <Hr />

      {/* Action */}
      <div className={style.action}>
        <button onClick={handleLike}>
          <div
            className={clsx(style.actionIcon, {
              [style.actionIconLiked]: liked,
            })}
          >
            {liked ? <AiFillLike /> : <AiOutlineLike />}
          </div>
          <div>Thích</div>
        </button>

        <button onClick={handleComment}>
          <div className={style.actionIcon}>
            <IoChatbubbleEllipsesOutline />
          </div>
          <div>Bình luận</div>
        </button>

        <button>
          <div className={style.actionIcon}>
            <IoShareSocialOutline />
          </div>
          <div>Chia sẻ</div>
        </button>
      </div>

      <Hr />

      {isDisplayComments && (
        <>
          <CommentCreate />
          <Comments postId={_id} />
        </>
      )}
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
