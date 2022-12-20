import React, { Fragment } from 'react';
import { BsChevronDoubleRight, BsTrash } from 'react-icons/bs';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitBack.module.css';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function HabitBack(props) {
  // format start date for displaying
  const startDate = dayjs(props.habit.startDate).format('DD MMM YYYY');
  // delete habit from list
  const deleteHabitHandler = () => {
    props.onDeleteHabit(props.habit.key);
  };

  return (
    <Fragment>
      <Wrapper key='habit-back' className={classes.habit__back}>
        <header>
          <h1>{props.habit.title}</h1>
          <motion.button whileTap={{ scale: 0.8 }} onTap={props.onFlip}>
            <BsChevronDoubleRight />
          </motion.button>
        </header>
        <main>
          <p>Goal: {props.habit.duration} days</p>
          <p>
            Result: {props.habit.trackInRow} day
            {props.habit.trackInRow === 1 ? '' : 's'}
          </p>
        </main>
        <footer>
          <motion.button whileTap={{ scale: 0.8 }} onTap={deleteHabitHandler}>
            <BsTrash />
            <span>Delete</span>
          </motion.button>
          <p>from {startDate}</p>
        </footer>
      </Wrapper>
    </Fragment>
  );
}
