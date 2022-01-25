import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import style from './Search.module.scss';

function Search() {
  return (
    <form className={style.wrapper}>
      <input className={style.input} type="search" />
      <button className={style.button}>
        <IoSearchOutline />
      </button>
    </form>
  );
}

export default Search;
