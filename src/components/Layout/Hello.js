import React from 'react';
import { motion } from 'framer-motion';
import classes from './Hello.module.css';

export default function Hello(props) {
  return (
    <motion.p
      className={classes.name}
      key={props.key}
      initial={{ translateX: '-100vw' }}
      animate={{ translateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, {props.username}!
    </motion.p>
  );
}

// <motion.div
// initial={{ translateX: '-100vw' }}
// animate={{ translateX: 0 }}
// transition={{ duration: 0.5, delay: 0.5 }}
// >
// <p className={classes.hello}>Hello, {props.username}!</p>
// </motion.div>
