import React from 'react';
import { motion } from 'framer-motion';
import classes from './WrapNavItem.module.css';
import { BsXLg } from 'react-icons/bs';
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
        <h2>{props.openedTab}</h2>
        <motion.button
          className={classes.back}
          whileTap={{ scale: 0.9 }}
          onTap={props.onBackToMenu}
        >
          <BsXLg />
        </motion.button>
      </header>
      {props.openedTab === 'Archive' && <Archive habits={props.habits} />}
      {props.openedTab === 'Rewards' && <Rewards habits={props.habits} />}
      {props.openedTab === 'Setting' && <Setting />}
    </motion.div>
  );
}
