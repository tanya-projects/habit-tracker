import React, { Fragment, useEffect, useState } from 'react';
import classes from './HabitMain.module.css';
import { animate, AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Hello from '../Layout/Hello';
import Habit from './Habit';
import HabitForm from './HabitForm';
import plus from '../../assets/plus.svg';

// const example = () => {
//   let trackExample = [];
//   for (let n = -4; n < -2; n++) {
//     trackExample.push({ day: dayjs().add(n, 'day'), isDone: false });
//   }
//   for (let n = -2; n < 0; n++) {
//     trackExample.push({ day: dayjs().add(n, 'day'), isDone: true });
//   }
//   for (let n = 0; n < 3; n++) {
//     trackExample.push({ day: dayjs().add(n, 'day'), isDone: null });
//   }

//   return trackExample;
// };
// const trackExample = example();

////
export default function HabitMain(props) {
  // Habits list

  // const [habits, setHabits] = useState([
  //   {
  //     key: 'id_123',
  //     title: 'Testing',
  //     track: trackExample,
  //     trackInRow: 2,
  //     duration: 7,
  //     startDate: dayjs().add(-4, 'day'),
  //   },
  // ]);
  const [habits, setHabits] = useState(() => {
    if (localStorage.getItem('habit-tracker-habits')) {
      return [...JSON.parse(localStorage.getItem('habit-tracker-habits'))];
    } else return [];
  });
  const trackedHabits = habits.filter((habit) => !habit.expired);
  console.log(trackedHabits);

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

  // when we flip to backside of habit - form should be closed
  const hideFormHandler = () => {
    setIsAddingFormOpen(false);
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
          trackInRow: 0,
          track: initialTrack,
          reward: 0,
          expired: false,
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
    // // find updated habit
    // const updatedHabit = habits.find((habit) => habit.key === updatedHabitKey);
    // // update today track
    // const updatedTrack = updatedHabit.track.find(
    //   (track) => FormatDate(track.day) === FormatDate(dayjs())
    // );
    // updatedTrack.isDone = todayCheck;
    // // compare and update track in row and reward if applicable
    // // variable for array of isDone values
    // let arrayIsDone = [];
    // for (let i = 0; i < updatedHabit.track.length; i++) {
    //   arrayIsDone.push(updatedHabit.track[i].isDone);
    // }
    // console.log(arrayIsDone);
  };

  useEffect(() => {
    console.log('CHECK ALL LIST', habits);

    localStorage.setItem('habit-tracker-habits', JSON.stringify(habits));
  }, [habits]);

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

        {!!trackedHabits.length && (
          <ul className={classes.habits}>
            <AnimatePresence>
              {trackedHabits.map((item) => (
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
                    onCloseForm={hideFormHandler}
                    isFormOpen={isAddingFormOpen}
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
