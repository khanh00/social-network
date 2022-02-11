import React from 'react';
import PropTypes from 'prop-types';

import style from './Overlay.module.scss';

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

function Overlay({ children }) {
  return <div className={style.wrapper}>{children}</div>;
}

export default Overlay;
