import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './ListItem.module.scss';

const ListItem = {
  Link: function ({ to, left, right, active = false, on, off, ...rest }) {
    return (
      <li {...rest}>
        <Link className={clsx(style.link, { [style.active]: active })} to={to}>
          {left.icon && <div className={style.icon}>{left.icon}</div>}
          {left.image && <div className={clsx(style.image, { [style.on]: on, [style.off]: off })}>{left.image}</div>}
          <div>{right}</div>
        </Link>
      </li>
    );
  },
};

ListItem.Link.propTypes = {
  to: PropTypes.string.isRequired,
  left: PropTypes.object,
  right: PropTypes.string.isRequired,
  active: PropTypes.bool,
  on: PropTypes.bool,
  off: PropTypes.bool,
};

export default ListItem;
