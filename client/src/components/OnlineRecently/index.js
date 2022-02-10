import React from 'react';

import avatar from '../../assets/avatars/arryn-house.png';
import ListItem from '../ui/ListItem';
import style from './OnlineRecently.module.scss';

function OnlineRecently() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Online gần đây</div>
      <ul>
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Nguyễn Minh Khánh" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Lorem ipsum dolor" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Dolorem obcaecati" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Dolorem obcaecati" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Lorem ipsum dolor" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Nguyễn Minh Khánh" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Lorem ipsum dolor" />
        <ListItem.Link to="/" left={{ image: <img src={avatar} alt="avatar" /> }} right="Dolorem obcaecati" />
      </ul>
    </div>
  );
}

export default OnlineRecently;
