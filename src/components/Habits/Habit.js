import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimation,
} from 'framer-motion';
import HabitFront from './HabitFront';
import HabitBack from './HabitBack';
import dayjs from 'dayjs';
import FormatDate from '../Helpers/FormatDate';

export default function Habit(props) {
  const habit = props.habit;
  // Variable for Habit track
  const habitTrack = props.habit.track;
  // Variable for today track
  const currentTrack = habitTrack.find(
    (item) => FormatDate(item.day) === FormatDate(dayjs())
  );
  // Past track data for working with track in row and reward
  const pastTrack = habitTrack.filter(
    (track) => FormatDate(track.day) < FormatDate(dayjs())
  );

  // console.log(currentHabit);

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
      habit.expire = true;
    }

    localStorage.setItem(
      'habit-tracker-habits',
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
  // console.log(props.habit.startDate);
  // Animation controls
  const controls = useAnimation();

  const onPan = (_, info) => {
    controls.set({
      translateX: info.offset.x / 2,
    });
    props.onCloseForm();
  };
  const onPanEnd = (_, info) => {
    controls.start({
      translateX: 0,
    });
    if (info.offset.x <= -60) {
      setIsBackVisible(!isBackVisible);
    }
  };

  // variables for common initial, animate, exit
  const flipAnimationVariants = {
    initial: { rotateY: 90 },
    animate: { rotateY: 0 },
    exit: { rotateY: 90 },
    transition: { duration: 0.5 },
  };

  return (
    <LayoutGroup>
      <AnimatePresence mode='wait'>
        <motion.div
          layout
          onPan={onPan}
          onPanEnd={onPanEnd}
          animate={controls}
          transition={{ duration: 0.3 }}
        >
          {!isBackVisible ? (
            // <motion.div {...flipAnimationVariants} key='habit-frontside'>
            <HabitFront
              habit={props.habit}
              onUpdateHabit={updateCurrentHabitHandler}
            />
          ) : (
            // </motion.div>
            // <motion.div {...flipAnimationVariants} key='habit-backside'>
            <HabitBack
              habit={props.habit}
              onDeleteHabit={props.onDeleteHabit}
            />
            // </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
