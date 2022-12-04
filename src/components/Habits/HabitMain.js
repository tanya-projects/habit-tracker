import React, { Fragment, useState } from 'react';
import classes from './HabitMain.module.css';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Hello from '../Layout/Hello';
import Habit from './Habit';
import HabitForm from './HabitForm';
import dayjs from 'dayjs';
import plus from '../../assets/plus.svg';

// const habitExample = [
//   {
//     key: 'id1',
//     title: 'Coding',
//     startDate: '01 Dec 2022',
//     trackInRow: 3,
//     track: [false, true, true, true],
//   },
// ];

export default function HabitMain(props) {
  // Habits list
  const [habits, setHabits] = useState([
    {
      key: `id_2222`,
      title: 'Coding React',
      startDate: '01 Dec 2022',
    },
    { key: `id_2252`, title: 'Workout', startDate: '01 Dec 2022' },
    { key: `id_22992`, title: 'Workout', startDate: '01 Dec 2022' },
    { key: `id_21152`, title: 'Workout', startDate: '01 Dec 2022' },
  ]);
  // Open form to add habit
  const [isAddingFormOpen, setIsAddingFormOpen] = useState(false);

  // Open Habit Form
  const openAddingFormHandler = (e) => {
    e.preventDefault();
    // Scroll to top for seeing form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // open/hide form
    setIsAddingFormOpen(!isAddingFormOpen);
  };

  // Add Habit Function
  const addHabitHandler = (habitTitle, habitStartDate, dateCreated) => {
    // Format start day to display it in card
    const formattedStartDay = dayjs(habitStartDate).format('DD MMM YYYY');
    setHabits((prevList) => {
      return [
        ...prevList,
        {
          key: `id_${dateCreated}`,
          title: habitTitle,
          startDate: formattedStartDay,
        },
      ];
    });

    // close habit adding form
    setIsAddingFormOpen(false);
  };

  // delete Habit
  const deleteHabitHandler = (key) => {
    setHabits((prevList) => {
      return prevList.filter((h) => h.key !== key);
    });
  };

  ////////
  // variants for motion
  const openFormButtonVariants = {
    open: { rotate: 45, scale: [0.8, 1, 0.8], background: 'var(--color-red)' },
    close: { rotate: 270, scale: 1, background: 'var(--color-04)' },
  };
  // main animation with opacity
  const opacityAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };
  // main animation with scale
  const scaleAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5 },
  };

  ////////

  return (
    <Fragment>
      <Hello username={props.username} />

      <LayoutGroup>
        <AnimatePresence>
          {isAddingFormOpen && (
            <HabitForm isOpen={isAddingFormOpen} onAddHabit={addHabitHandler} />
          )}
        </AnimatePresence>

        {!!habits.length && (
          <ul className={classes.habits}>
            <AnimatePresence>
              {habits.map((item) => (
                <motion.li
                  layout
                  {...scaleAnimation}
                  exit={{ translateX: '100vw' }}
                  key={item.key}
                  className={classes.habit__item}
                >
                  <Habit habit={item} onDeleteHabit={deleteHabitHandler} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </LayoutGroup>

      <motion.footer {...opacityAnimation} className={classes.footer}>
        <motion.button
          className={classes.add__btn}
          whileTap={{ scale: 0.9 }}
          onTap={openAddingFormHandler}
          animate={isAddingFormOpen ? 'open' : 'close'}
          variants={openFormButtonVariants}
          transition={{ duration: 0.2 }}
        >
          <img src={plus} alt='plus-sign' />
        </motion.button>
      </motion.footer>
    </Fragment>
  );
}
