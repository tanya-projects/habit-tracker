import React, { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import HabitFront from './HabitFront';
import HabitBack from './HabitBack';
import dayjs from 'dayjs';
import FormatDate from '../Helpers/FormatDate';

export default function Habit(props) {
  // function for adding new day to habit track
  function addTodayToTrack() {
    const todayTrack = habit.track.find(
      (track) => FormatDate(track.day) === FormatDate(dayjs())
    );
    if (todayTrack) {
      return habit.track;
    } else {
      const addTodayToArray = [...habit.track, { day: dayjs(), isDone: null }];
      return addTodayToArray;
    }
  }

  const habit = props.habit;
  // Variable for Habit track
  const habitTrack = addTodayToTrack();
  // Update habit track for today date
  props.habit.track = habitTrack;
  // Variable for today track
  const currentTrack = habitTrack.find(
    (item) => FormatDate(item.day) === FormatDate(dayjs())
  );
  // Past track data for working with track in row and reward
  const pastTrack = habitTrack.filter(
    (track) => FormatDate(track.day) < FormatDate(dayjs())
  );

  const updateCurrentHabitHandler = (todayCheck) => {
    currentTrack.isDone = todayCheck;

    // update track in row value based on isDone data
    let isDoneArray = [];
    // if we don't have past data (just start to track habit) and today we track
    if (!pastTrack.length && todayCheck) {
      habit.trackInRow = 1;
    } else if (!pastTrack.length && !todayCheck) {
      // new habit with no past data and today we still havn't track
      habit.trackInRow = 0;
    }

    // if we have past data we track how many true values go in row
    if (pastTrack.length) {
      for (let i = 0; i < pastTrack.length; i++) {
        isDoneArray.push(pastTrack[i].isDone);
      }
      const doneInRow = isDoneArray.reduce((acc, curr) => {
        if (curr) {
          return acc + curr;
        } else {
          return (acc = 0);
        }
      }, 0);
      todayCheck
        ? (habit.trackInRow = doneInRow + 1)
        : (habit.trackInRow = doneInRow);
    }

    // if track in row is equal to duration then set this habit to expire
    if (habit.trackInRow === habit.duration) {
      habit.expired = true;
    }

    localStorage.setItem(
      `habit-tracker-habits-${props.username}`,
      JSON.stringify(props.allHabits)
    );
  };

  useEffect(() => {
    if (props.isFormOpen) {
      setIsBackVisible(false);
    }
  }, [props.isFormOpen]);

  //////////////////////////////
  // Set state for backside visibility
  const [isBackVisible, setIsBackVisible] = useState(false);

  const displaySideHandler = () => {
    setIsBackVisible(!isBackVisible);
    props.onCloseForm();
  };

  const flipAnimation = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    exit: { scaleY: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <LayoutGroup>
      <AnimatePresence>
        <motion.div layout transition={{ duration: 0.3 }}>
          {!isBackVisible ? (
            <motion.div {...flipAnimation} key='frontside-habit'>
              <HabitFront
                habit={props.habit}
                onUpdateHabit={updateCurrentHabitHandler}
                onFlip={displaySideHandler}
              />
            </motion.div>
          ) : (
            <motion.div {...flipAnimation} key='backside-habit'>
              <HabitBack
                habit={props.habit}
                onDeleteHabit={props.onDeleteHabit}
                onFlip={displaySideHandler}
                animation={flipAnimation}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
