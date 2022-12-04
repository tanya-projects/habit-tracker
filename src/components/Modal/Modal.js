import React from 'react';
import { motion } from 'framer-motion';
import classes from './Modal.module.css';

export default function Modal(props) {
  // Confirm delete Habit
  console.log(props.habitKey);
  const deleteHabitHandler = () => {
    props.onDeleteHabit(props.habitKey);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={classes.modal}
    >
      <div className={classes.content}>
        <h1>Confirm Deleting</h1>
        <p>
          This action cannot be undone and your tracking progress will be lost
        </p>
        <div>
          <motion.button
            whileTap={{ opacity: 0.1 }}
            onTap={props.onCancel}
            className={classes.cancel}
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onTap={deleteHabitHandler}
            className={classes.delete}
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
