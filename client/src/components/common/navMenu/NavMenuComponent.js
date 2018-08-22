import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

const nav = 'nav-container';
const bemClasses = getBEMClasses([nav]);

const Nav = props => {
  return (
    <div className={bemClasses()} data-cy={bemClasses()}>
      {props.tabs.map((tab, index) => (
        <NavLink exact key={index} to={tab.url} className={bemClasses('tab')} data-cy={bemClasses('tab')}>
          {tab.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
