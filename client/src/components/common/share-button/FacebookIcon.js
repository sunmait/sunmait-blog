import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Icons.css';

const iconClass = 'custom-icons';
const bemClasses = getBEMClasses([iconClass]);

const FacebookIcon = (props) => {
  return (
    <svg className={bemClasses(null, 'facebook')} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="-15 -15 142 142" aria-labelledby="title">
      <circle cx="56" cy="56" r="66" />
      <path d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
		c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"/>
    </svg>
  );
};

export default FacebookIcon;
