import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSend } from 'react-icons/ai';

import avatar from '../../assets/Screenshot from 2021-12-30 10-41-51.png';
import style from './CommentCreate.module.scss';
import * as api from '../../api';
import { useSocket } from '../../contexts/socketContext';

function CommentCreate({ postId }) {
  const [text, setText] = useState('');
  const socket = useSocket();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (text.trim() === '') return;

      const formData = new FormData();
      formData.append('text', text);
      formData.append('post', postId);

      const { error: errorCreateComment } = await api.createComment(formData);
      if (errorCreateComment) return console.log(errorCreateComment.message);
      setText('');

      const {
        data: { comments },
        error: errorGetComments,
      } = await api.getComments(`post=${postId}`);
      if (errorGetComments) return console.log(errorGetComments.message);
      socket.emit('create comment', comments);
    },
    [postId, socket, text]
  );

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <div className={style.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <input
        className={style.input}
        type="text"
        placeholder="Nhập bình luận"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className={style.button}>
        <AiOutlineSend />
      </button>
    </form>
  );
}

CommentCreate.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentCreate;
