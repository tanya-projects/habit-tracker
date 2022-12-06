import React, { Fragment, useEffect, useState } from 'react';
import classes from './HabitMain.module.css';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Hello from '../Layout/Hello';
import Habit from './Habit';
import HabitForm from './HabitForm';
import dayjs from 'dayjs';
import plus from '../../assets/plus.svg';
import FormatDate from '../Helpers/FormatDate';

const example = () => {
  let trackExample = [];
  for (let n = -4; n < 3; n++) {
    trackExample.push({ day: dayjs().add(n, 'day'), isDone: null });
  }

  return trackExample;
};
const trackExample = example();

////
export default function HabitMain(props) {
  // Habits list
  // const [habits, setHabits] = useState(() => {
  //   if (localStorage.getItem('habit-tracker-habits')) {
  //     return [...JSON.parse(localStorage.getItem('habit-tracker-habits'))];
  //   }
  //   return [];
  // });
  // const [habits, setHabits] = useState([
  // {
  //   key: 'id_123',
  //   title: 'Testing',
  //   track: trackExample,
  //   trackInRow: 0,
  //   duration: 7,
  //   startDate: dayjs().add(-4, 'day'),
  // },
  // ]);
  const [habits, setHabits] = useState(() => {
    if (localStorage.getItem('habit-tracker-habits')) {
      return [...JSON.parse(localStorage.getItem('habit-tracker-habits'))];
    } else return [];
  });
  const [trackInRow, setTrackInRow] = useState(0);

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
  const addHabitHandler = (
    habitTitle,
    habitStartDate,
    dateCreated,
    duration
  ) => {
    let initialTrack = [];
    for (let day = 0; day < duration; day++) {
      const initialDay = { day: habitStartDate.add(day, 'day'), isDone: null };
      initialTrack.push(initialDay);
    }

    setHabits((prevList) => {
      return [
        ...prevList,
        {
          key: `id_${dateCreated}`,
          title: habitTitle,
          startDate: habitStartDate,
          duration: duration,
          trackInRow: trackInRow,
          track: initialTrack,
          reward: 0,
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

  const updateHabitHandler = (updatedHabitKey, todayCheck) => {
    // find updated habit
    const updatedHabit = habits.find((habit) => habit.key === updatedHabitKey);
    console.log(updatedHabit.track);
    const updatedTrack = updatedHabit.track.find(
      (track) => FormatDate(track.day) === FormatDate(dayjs())
    );
    updatedTrack.isDone = todayCheck;
    console.log(updatedTrack);
  };

  useEffect(() => {
    console.log(habits);

    localStorage.setItem('habit-tracker-habits', JSON.stringify(habits));
  }, [habits]);

  console.log('CHECK ALL LIST', habits);
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
                  <Habit
                    habit={item}
                    onDeleteHabit={deleteHabitHandler}
                    onUpdateHabit={updateHabitHandler}
                    allHabits={habits}
                  />
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
