import React, { Fragment, useState } from 'react';
import classes from './HabitList.module.css';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Habit from './Habit';
import HabitForm from './HabitForm';
import dayjs from 'dayjs';
import plus from '../../assets/plus.svg';

export default function HabitList(props) {
  // Habits list
  const [habits, setHabits] = useState([
    {
      key: `id_2222`,
      title: 'WorkOut',
      startDate: '01 Dec 2022',
    },
    { key: `id_2252`, title: 'WorkOut', startDate: '01 Dec 2022' },
  ]);
  // Open form to add habit
  const [isAddingFormOpen, setIsAddingFormOpen] = useState(false);

  // delay stats
  const delay = 0.5;

  // Open Habit Form
  const openAddingFormHandler = (e) => {
    e.preventDefault();
    // Scroll to top for seeing form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // open/hide form
    setIsAddingFormOpen(!isAddingFormOpen);
  };
  // Add Habit
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

  return (
    <Fragment>
      <motion.div
        initial={{ translateX: '-100vw' }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className={classes.hello}>Hello, {props.username}!</p>
      </motion.div>

      <LayoutGroup>
        <AnimatePresence>
          {isAddingFormOpen && (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ translateX: '100vw' }}
              transition={{ duration: 0.3 }}
            >
              <HabitForm
                isOpen={isAddingFormOpen}
                onAddHabit={addHabitHandler}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!!habits.length && (
          <ul className={classes.habits}>
            <AnimatePresence>
              {habits.map((item) => (
                <motion.li
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key={item.key}
                  className={classes.habit__item}
                >
                  <Habit habit={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </LayoutGroup>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={classes.footer}
      >
        <motion.button
          className={classes.add__btn}
          is-form-open={isAddingFormOpen.toString()}
          whileTap={{ scale: 0.9 }}
          onClick={openAddingFormHandler}
        >
          <img src={plus} alt='plus-sign' />
        </motion.button>
      </motion.footer>
    </Fragment>
  );
}
