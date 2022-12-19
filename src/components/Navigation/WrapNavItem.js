import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './WrapNavItem.module.css';
import { BsArrowLeft } from 'react-icons/bs';
import Setting from './Setting';
import Archive from './Archive';
import Rewards from './Rewards';

export default function WrapNavItem(props) {
  return (
    <motion.div
      className={classes.wrap}
      initial={{ left: '100%' }}
      animate={{ left: '-100%' }}
      exit={{ left: '100%' }}
      transition={{ duration: 0.6 }}
    >
      <header>
        <motion.button
          className={classes.back}
          whileTap={{ scale: 0.9 }}
          onTap={props.onBackToMenu}
        >
          <BsArrowLeft />
        </motion.button>
        <h2>{props.openedTab}</h2>
      </header>
      {props.openedTab === 'Archive' && <Archive habits={props.habits} />}
      {props.openedTab === 'Rewards' && <Rewards rewards={props.rewards} />}
      {props.openedTab === 'Setting' && <Setting />}
    </motion.div>
  );
}
