import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { IoCaretDown, IoCloseOutline, IoLockClosed, IoImage } from 'react-icons/io5';
import PropTypes from 'prop-types';

import Overlay from '../ui/Overlay';
import style from './PostCreate.module.scss';
import * as api from '../../api';
import { useClickOutside } from '../../utils';
import { useSocket } from '../../contexts/socketContext';
import FilesReview from '../FilesReview';
import { useAuth } from '../../contexts/authContext';

function PostCreate({ setIsHidden }) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isReviewFiles, setIsReviewFiles] = useState(false);
  const [fileReview, setFileReview] = useState();
  const formEl = useRef(null);
  const { currentUser } = useAuth();
  const socket = useSocket();

  useClickOutside(formEl, () => setIsHidden(true));

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (text.trim() === '') return;
      const formData = new FormData(formEl.current);

      const { error: errorCreatePost } = await api.createPost(formData);
      if (errorCreatePost) return console.log(errorCreatePost.message);
      setIsHidden(true);

      const { data, error: errorGetPosts } = await api.getPosts();
      if (errorGetPosts) return console.log(errorGetPosts.message);
      socket.emit('create post', data.posts);
    },
    [setIsHidden, socket, text]
  );

  const handleUploadFile = useCallback((event) => {
    const { files } = event.target;
    const arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push({ src: URL.createObjectURL(files[i]), typeFile: files[i].type.split('/')[0] });
    }
    setFiles(arr);
  }, []);

  return (
    <Overlay>
      <form ref={formEl} className={style.wrapper}>
        <div className={style.top}>
          <h3 className={style.topHeading}>Tạo bài viết</h3>
          <button className={style.topIcon} onClick={() => setIsHidden(true)}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={style.author}>
          <div className={style.authorAvatar}>
            <img src={currentUser.avatar} alt={currentUser.fullName} />
          </div>
          <div>
            <div className={style.authorFullName}>{currentUser.fullName}</div>
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

        <div className={style.filesReview}>
          {files.map((file) => (
            <button
              key={file.src}
              className={style.file}
              onClick={(e) => {
                e.preventDefault();
                setIsReviewFiles(true);
                setFileReview(file);
              }}
            >
              {file.typeFile === 'image' && <img src={file.src} alt={file.src} />}
              {file.typeFile === 'video' && (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={file.src}></video>
              )}
            </button>
          ))}
        </div>

        {isReviewFiles && <FilesReview files={files} file={fileReview} setIsReviewFiles={setIsReviewFiles} />}

        <div className={style.bottom}>
          <label className={style.labelUploadFile}>
            <IoImage />
            <input type="file" name="files" accept="image/*, video/*" multiple onChange={handleUploadFile} />
          </label>
          <button className={clsx(style.btnSubmit, { [style.disable]: !text.trim() })} onClick={handleSubmit}>
            Đăng
          </button>
        </div>
      </form>
    </Overlay>
  );
}

PostCreate.propTypes = {
  setIsHidden: PropTypes.func.isRequired,
};

export default PostCreate;
