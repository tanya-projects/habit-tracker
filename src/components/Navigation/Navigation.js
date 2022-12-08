import React, { useState } from 'react';
import { motion } from 'framer-motion';
import plus from '../../assets/plus.svg';
import classes from './Navigation.module.css';

const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const menuItems = ['Rewards', 'Archive', 'FAQ', 'Setting'];
// const menuItems = ['Rewards', 'Setting'];

export default function Navigation(props) {
  return (
    <motion.nav
      className={classes.header__nav}
      {...opacityAnimation}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.ul>
        {menuItems.map((item, index) => {
          return (
            <motion.li
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              key={`menu-item-${index}`}
            >
              {item}
            </motion.li>
          );
        })}
      </motion.ul>
      <motion.button
        {...opacityAnimation}
        transition={{ delay: 4 * 0.1 }}
        onTap={props.onDisplay}
      >
        <img src={plus} alt='close menu button' />
      </motion.button>
    </motion.nav>
  );
}
