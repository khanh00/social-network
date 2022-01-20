import React from 'react';
import PropTypes from 'prop-types';

import style from './Icon.module.scss';

const Icon = {
  Header: function ({ children }) {
    return <div className={style.header}>{children}</div>;
  },
};

Icon.Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Icon;
