import React, { Fragment, useEffect, useState } from 'react';
import classes from './HabitMain.module.css';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Habit from './Habit';
import HabitForm from './HabitForm';
import Header from '../Layout/Header';

////
export default function HabitMain(props) {
  // Habits list
  const [habits, setHabits] = useState(() => {
    if (localStorage.getItem(`habit-tracker-habits-${props.username}`)) {
      return [
        ...JSON.parse(
          localStorage.getItem(`habit-tracker-habits-${props.username}`)
        ),
      ];
    } else return [];
  });
  /////////////
  const trackedHabits = habits.filter((habit) => !habit.expired);
  ////////////

  // Open form to add habit
  const [isAddingFormOpen, setIsAddingFormOpen] = useState(false);

  // Open Habit Form
  const openAddingFormHandler = (e) => {
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
          track: [{ day: habitStartDate, isDone: null }],
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

  useEffect(() => {
    console.log(habits);

    localStorage.setItem(
      `habit-tracker-habits-${props.username}`,
      JSON.stringify(habits)
    );
  }, [habits, props.username]);

  ////////
  // variants for motion

  // main animation with scale
  const scaleAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5 },
  };

  ////////

  return (
    <Fragment>
      <Header
        username={props.username}
        habits={habits}
        onDisplayForm={openAddingFormHandler}
        isFormOpen={isAddingFormOpen}
        onHideForm={hideFormHandler}
      />

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
                    username={props.username}
                    habit={item}
                    onDeleteHabit={deleteHabitHandler}
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
    </Fragment>
  );
}
