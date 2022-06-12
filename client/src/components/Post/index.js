/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoChatbubbleEllipsesOutline, IoShareSocialOutline, IoPlayCircleOutline } from 'react-icons/io5';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

import style from './Post.module.scss';
import Comments from './Comments';
import Hr from '../ui/Hr';
import * as api from '../../api';
import CommentCreate from '../CommentCreate';
import { displayTime } from '../../utils';
import { useSocket } from '../../contexts/socketContext';
import FilesReview from '../FilesReview';

function Post({ post: { _id, text, files, createdAt, updatedAt, author, comments, likes }, liked }) {
  files = files.map((file) => ({ ...file, src: `${process.env.REACT_APP_SERVER}/${file.src}` }));

  const [isDisplayComments, setIsDisplayComments] = useState(false);
  const [isReviewFiles, setIsReviewFiles] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length);
  const [numberOfComments, setNumberOfComments] = useState(comments.length);
  const socket = useSocket();

  const handleLike = useCallback(async () => {
    if (isLiked) {
      const { data, error: errorGetLike } = await api.getAuthorLikes(`post=${_id}`);
      if (errorGetLike) return console.log(errorGetLike.message);

      const { error: errorDelLike } = await api.deleteLike(data.likes[0]._id);
      if (errorDelLike) return console.log(errorDelLike.message);

      setIsLiked(false);
      socket.emit('delete like');
    }

    if (!isLiked) {
      const { error } = await api.createLike({
        type: 'like',
        post: _id,
      });

      if (error) return console.log(error.message);

      setIsLiked(true);
      socket.emit('create like');
    }
  }, [_id, isLiked, socket]);

  useEffect(() => {
    socket.on('increase like', () => {
      setNumberOfLikes((prev) => prev + 1);
    });
    socket.on('decrease like', () => {
      setNumberOfLikes((prev) => prev - 1);
    });

    return () => {
      socket.off('increase like');
      socket.off('decrease like');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('change number comments', (number) => {
      setNumberOfComments(number);
    });
    return () => {
      socket.off('change number comments');
    };
  }, [socket]);

  const handleReviewFiles = useCallback(() => {
    setIsReviewFiles(!isReviewFiles);
  }, [isReviewFiles]);

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

        {files.length > 0 && (
          <button className={style.file} onClick={handleReviewFiles}>
            {files[0].typeFile === 'image' && <img src={files[0].src} alt={files[0].src} />}
            {files[0].typeFile === 'video' && (
              <div className={style.video}>
                <video src={files[0].src}></video>
                <div className={style.icon}>
                  <IoPlayCircleOutline />
                </div>
              </div>
            )}

            {files.length > 1 && (
              <div className={style.filesOther}>
                {files[1].typeFile === 'image' && <img src={files[1].src} alt={files[1].src} />}
                {files[1].typeFile === 'video' && <video src={files[1].src}></video>}
                <span>{files.length - 1}+</span>
              </div>
            )}
          </button>
        )}

        {/* Status */}
        <div className={style.status}>
          <div className={style.statusLike}>
            <div className={style.statusIcon}>
              <AiFillLike />
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
              [style.actionIconLiked]: isLiked,
            })}
          >
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          </div>
          <div>Thích</div>
        </button>

        <button onClick={() => setIsDisplayComments(!isDisplayComments)}>
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

      {isReviewFiles && <FilesReview files={files} setIsReviewFiles={setIsReviewFiles} />}
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  liked: PropTypes.bool,
};

export default Post;
