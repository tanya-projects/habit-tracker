import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HabitFront from './HabitFront';
import HabitBack from './HabitBack';
import dayjs from 'dayjs';

export default function Habit(props) {
  const currentHabit = props.habit;

  const updateCurrentHabitHandler = (todayCheck) => {
    props.onUpdateHabit(currentHabit.key, todayCheck);
  };

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
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      onPan={onPan}
      onPanEnd={onPanEnd}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      {isBackVisible ? (
        <motion.div {...flipAnimationVariants} key='habit-backside'>
          <HabitBack habit={props.habit} onDeleteHabit={props.onDeleteHabit} />
        </motion.div>
      ) : (
        <motion.div {...flipAnimationVariants} key='habit-frontside'>
          <HabitFront
            habit={props.habit}
            onUpdateHabit={updateCurrentHabitHandler}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
