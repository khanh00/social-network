import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.scss';

const Button = {
  Default: function ({ children }) {
    return <button className={style.default}>{children}</button>;
  },
  Submit: function ({ children }) {
    return <button className={style.submit}>{children}</button>;
  },
};

Button.Default.propTypes = { children: PropTypes.node.isRequired };
Button.Submit.propTypes = { children: PropTypes.node.isRequired };

export default Button;
