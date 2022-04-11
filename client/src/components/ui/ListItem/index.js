import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './ListItem.module.scss';

const ListItem = {
  Link: function ({ to, left, right, active = false }) {
    return (
      <li>
        <Link className={clsx(style.link, { [style.active]: active })} to={to}>
          {left.icon && <div className={style.icon}>{left.icon}</div>}
          {left.image && <div className={style.image}>{left.image}</div>}
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
};

export default ListItem;
