import React, { Fragment } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitBack.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function HabitBack(props) {
  // delete habit from list
  const deleteHabitHandler = () => {
    props.onDeleteHabit(props.habit.key);
  };

  return (
    <Fragment>
      <AnimatePresence initial={false}>
        <Wrapper key='habit-back' className={classes.habit__back}>
          <header>
            <h1>{props.habit.title}</h1>
            <motion.button whileTap={{ scale: 0.8 }} onTap={deleteHabitHandler}>
              <BsTrash />
            </motion.button>
          </header>
          <p>{props.habit.startDate}</p>
          <button>
            <BsPencilSquare />
          </button>
        </Wrapper>
      </AnimatePresence>
    </Fragment>
  );
}
