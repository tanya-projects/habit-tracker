import React from 'react';
import { motion } from 'framer-motion';
import classes from './Setting.module.css';
import { BsArrowLeft } from 'react-icons/bs';

export default function Setting(props) {
  return (
    <motion.div
      className={classes.setting}
      initial={{ left: '100%' }}
      animate={{ left: '-100%' }}
      exit={{ left: '100%' }}
      transition={{ duration: 0.6 }}
    >
      <motion.button
        className={classes.back}
        whileTap={{ scale: 0.9 }}
        onTap={props.onBackToMenu}
      >
        <BsArrowLeft />
      </motion.button>
      <h1>test</h1>
    </motion.div>
  );
}
