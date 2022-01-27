import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.scss';

const Button = {
  Default: function ({ children, onClick }) {
    return (
      <button className={style.default} onClick={onClick}>
        {children}
      </button>
    );
  },
  Submit: function ({ children }) {
    return <button className={style.submit}>{children}</button>;
  },
};

Button.Default.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.Submit.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
