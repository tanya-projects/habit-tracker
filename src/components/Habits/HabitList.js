import React from 'react';
import classes from './HabitList.module.css';
import { motion } from 'framer-motion';

export default function HabitList(props) {
  return (
    <div>
      <motion.div
        initial={{ translateX: '-100vw' }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>Hello, {props.username}!</p>
      </motion.div>
    </div>
  );
}
