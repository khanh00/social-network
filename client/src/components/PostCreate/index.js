import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { IoCaretDown, IoCloseOutline, IoLockClosed, IoImage } from 'react-icons/io5';
import PropTypes from 'prop-types';

import Overlay from '../ui/Overlay';
import style from './PostCreate.module.scss';
import * as api from '../../api';
import { useClickOutside } from '../../utils';
import { useSocket } from '../../contexts/socketContext';
import ImagesReview from '../ImagesReview';

function PostCreate({ setIsHidden }) {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [isReviewImages, setIsReviewImages] = useState(false);
  const [imageReview, setImageReview] = useState();
  const formEl = useRef(null);
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

      const {
        data: { posts },
        error: errorGetPosts,
      } = await api.getPosts();
      if (errorGetPosts) return console.log(errorGetPosts.message);
      socket.emit('create post', posts);
    },
    [setIsHidden, socket, text]
  );

  const handleUploadImage = useCallback((event) => {
    // images.forEach((img) => {
    //   URL.revokeObjectURL(img.src);
    // });

    const { files } = event.target;
    const imgs = [];

    for (let i = 0; i < files.length; i++) {
      imgs.push(URL.createObjectURL(files[i]));
    }

    setImages(imgs);
  }, []);

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
            <img src={'avatar'} alt="avatar" />
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

        <div className={style.imagesReview}>
          {images.map((image) => (
            <button
              key={image}
              className={style.image}
              onClick={() => {
                setIsReviewImages(true);
                setImageReview(image);
              }}
            >
              <img src={image} alt={image} />
            </button>
          ))}
        </div>

        {isReviewImages && <ImagesReview images={images} image={imageReview} setIsReviewImages={setIsReviewImages} />}

        <div className={style.bottom}>
          <label className={style.labelUploadImg}>
            <IoImage />
            <input type="file" name="images" accept="image/*" multiple onChange={handleUploadImage} />
          </label>
          <button className={clsx(style.btnSubmit, { [style.disable]: !text.trim() })}>Đăng</button>
        </div>
      </form>
    </Overlay>
  );
}

PostCreate.propTypes = {
  setIsHidden: PropTypes.func.isRequired,
};

export default PostCreate;
