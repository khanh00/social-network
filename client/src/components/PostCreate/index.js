import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { IoCaretDown, IoCloseOutline, IoLockClosed } from 'react-icons/io5';
import PropTypes from 'prop-types';

import Overlay from '../ui/Overlay';
import style from './PostCreate.module.scss';
import avatar from '../../assets/avatars/iron-man.png';
import * as api from '../../api';
import { useClickOutside } from '../../utils';

function PostCreate({ setIsHidden }) {
  const [text, setText] = useState('');
  const formEl = useRef(null);

  useClickOutside(formEl, () => setIsHidden(true));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() === '') return;
    const formData = new FormData(formEl.current);
    const { error } = await api.createPost(formData);
    if (error) return console.log(error.message);
    setIsHidden(true);
  };

  return (
    <Overlay>
      <form ref={formEl} className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.top}>
          <h3 className={style.topHeading}>Tạo bài viết</h3>
          <button className={style.topIcon} onClick={() => setIsHidden(true)}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={style.author}>
          <div className={style.authorAvatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div>
            <div className={style.authorFullName}>Nguyễn Minh Khánh</div>
            <div className={style.authorRole}>
              <IoLockClosed />
              Chỉ mình tôi
              <IoCaretDown />
            </div>
          </div>
        </div>

        <textarea
          name="text"
          value={text}
          className={style.textarea}
          placeholder="Bạn đang nghĩ gì?"
          onChange={(event) => setText(event.target.value)}
        />

        <button
          className={clsx(style.button, { [style.disable]: !text.trim() })}
        >
          Đăng
        </button>
      </form>
    </Overlay>
  );
}

PostCreate.propTypes = {
  setIsHidden: PropTypes.func.isRequired,
};

export default PostCreate;