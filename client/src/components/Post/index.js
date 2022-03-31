import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoChatbubbleEllipsesOutline, IoShareSocialOutline } from 'react-icons/io5';
import { AiFillLike, AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';

import style from './Post.module.scss';
import Comments from './Comments';
import Hr from '../ui/Hr';
import * as api from '../../api';
import CommentCreate from '../CommentCreate';
import { displayTime } from '../../utils';
import { useAuth } from '../../contexts/authContext';
import { useSocket } from '../../contexts/socketContext';
import ImagesReview from '../ImagesReview';

function Post({ post: { _id, text, images, createdAt, updatedAt, author, comments, likes } }) {
  images = images.map((image) => `${process.env.REACT_APP_SERVER}/images/post/${image}`);
  console.log(images);

  const [isDisplayComments, setIsDisplayComments] = useState(false);
  const [isReviewImages, setIsReviewImages] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length);
  const [numberOfComments, setNumberOfComments] = useState(comments.length);
  const auth = useAuth();
  const socket = useSocket();

  const handleLike = async () => {
    if (liked) {
      const { error } = api.deleteLike(likeId);

      if (error) return console.log(error.message);

      setLiked(false);
      setNumberOfLikes((prev) => prev - 1);
    }

    if (!liked) {
      const { data, error } = await api.createLike({
        type: 'like',
        post: _id,
      });

      if (error) return console.log(error.message);

      setLikeId(data._id);
      setLiked(true);
      setNumberOfLikes((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const like = likes.find((like) => like.author === auth.currentUser);
    if (like) {
      setLikeId(like._id);
      setLiked(true);
    }
  }, [auth.currentUser, likes]);

  useEffect(() => {
    socket.on('change number comments', (number) => {
      setNumberOfComments(number);
    });
    return () => {
      socket.off('change number comments');
    };
  }, [socket]);

  const handleReviewImages = useCallback(() => {
    setIsReviewImages(!isReviewImages);
  }, [isReviewImages]);

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
            <div className={style.time}>{displayTime(createdAt, updatedAt)}</div>
          </div>
        </div>

        {text && (
          <div className={style.text}>
            <p>{text}</p>
          </div>
        )}

        {images && (
          <button className={style.image} onClick={handleReviewImages}>
            <img src={images[0]} alt="post" key={images[0]} />
            {images.length > 1 && (
              <div className={style.imageOther}>
                <img src={images[1]} alt="post" key={images[1]} />
                <span>{images.length - 1}+</span>
              </div>
            )}
          </button>
        )}

        {/* Status */}
        <div className={style.status}>
          <div className={style.statusLike}>
            <div className={style.statusIcon}>
              <AiTwotoneLike />
            </div>
            {numberOfLikes}
          </div>

          <button className={style.statusComment} onClick={() => setIsDisplayComments(!isDisplayComments)}>
            {numberOfComments} bình luận
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

        <button>
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
          <CommentCreate postId={_id} />
          <Comments postId={_id} />
        </>
      )}

      {isReviewImages && <ImagesReview images={images} setIsReviewImages={setIsReviewImages} />}
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
