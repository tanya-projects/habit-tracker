import React from 'react';
import classes from './Wrapper.module.css';

export default function Wrapper(props) {
  return (
    <div className={`${classes.wrapper} ${props.className}`}>
      {props.children}
    </div>
  );
}
