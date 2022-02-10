import React from 'react';
import PropTypes from 'prop-types';

import style from './Grid.module.scss';

const Grid = {
  Container: function ({ children }) {
    return <div className={style.container}>{children}</div>;
  },
  Item: function ({ column, children }) {
    return <div className={style[`column-${column}`]}>{children}</div>;
  },
};

Grid.Container.propTypes = {
  children: PropTypes.node,
};

Grid.Item.propTypes = {
  column: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Grid;
