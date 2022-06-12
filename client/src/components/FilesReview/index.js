/* eslint-disable jsx-a11y/media-has-caption */
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import style from './FilesReview.module.scss';

function FilesReview({ files, file = files[0], setIsReviewFiles }) {
  const [fileReview, setFileReview] = useState(file);

  const changeFileReview = useCallback((file) => {
    setFileReview(file);
  }, []);

  return (
    <div className={style.wrapper}>
      <button className={style.closeReview} onClick={() => setIsReviewFiles(false)}>
        <FaTimes />
      </button>
      <div className={style.fileReview}>
        {fileReview.typeFile === 'image' && <img src={fileReview.src} alt={fileReview.src} />}
        {fileReview.typeFile === 'video' && <video controls autoPlay src={fileReview.src}></video>}
      </div>
      <div className={style.files}>
        {files.map((file) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              changeFileReview(file);
            }}
            key={file.src}
            className={clsx(file.src === fileReview.src && style.active)}
          >
            {file.typeFile === 'image' && <img src={file.src} alt={file.src} />}
            {file.typeFile === 'video' && <video src={file.src}></video>}
          </button>
        ))}
      </div>
    </div>
  );
}

FilesReview.propTypes = {
  files: PropTypes.array,
  file: PropTypes.object,
  setIsReviewFiles: PropTypes.func,
};

export default FilesReview;
