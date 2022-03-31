import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import style from './ImagesReview.module.scss';

function ImagesReview({ images, image = images[0], setIsReviewImages }) {
  const [imageReview, setImageReview] = useState(image);

  const changeImageReview = useCallback((image) => {
    setImageReview(image);
  }, []);

  return (
    <div className={style.wrapper}>
      <button className={style.closeReview} onClick={() => setIsReviewImages(false)}>
        <FaTimes />
      </button>
      <div className={style.imageReview}>
        <img src={imageReview} alt="post" />
      </div>
      <div className={style.images}>
        {images.map((image) => (
          <button
            onClick={() => {
              changeImageReview(image);
            }}
            key={image}
            className={clsx(image === imageReview && style.active)}
          >
            <img src={image} alt="post" />
          </button>
        ))}
      </div>
    </div>
  );
}

ImagesReview.propTypes = {
  images: PropTypes.array,
  image: PropTypes.string,
  setIsReviewImages: PropTypes.func,
};

export default ImagesReview;
