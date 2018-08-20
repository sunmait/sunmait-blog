import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

const nav = 'nav';
const bemClasses = getBEMClasses([nav]);

const Nav = props => {
  return (
    <div className={bemClasses('container')}>
      {props.tabs.map((tab, index) => (
        <NavLink exact key={index} to={tab.url} className={bemClasses('tab')}>
          {tab.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
