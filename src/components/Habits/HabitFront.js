import dayjs from 'dayjs';
import React, { useState } from 'react';
// import { BsStarFill } from 'react-icons/bs';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitFront.module.css';
import FormatDate from '../Helpers/FormatDate';
import { motion } from 'framer-motion';

export default function HabitFront(props) {
  const todayDate = dayjs();
  const habit = props.habit;

  // format start date of tracking for display in card
  const startDate = FormatDate(habit.startDate);

  // state for tracking today activity on current habit
  const [todayCheck, setTodayCheck] = useState(() => {
    const checkTodayTrack = habit.track.find(
      (item) => FormatDate(item.day) === FormatDate(todayDate)
    );
    if (checkTodayTrack.isDone) {
      return true;
    } else return false;
  });

  const trackTodayHabitHandler = (e) => {
    // change today activity as checked
    setTodayCheck(e.target.checked);
    props.onUpdateHabit(e.target.checked);
  };

  // Variants for animate checkbox
  const checkboxVariants = {
    checked: { background: 'var(--color-04)', scale: [1.2, 1] },
    empty: { opacity: 0.5, scale: 0.8, background: 'var(--color-01)' },
  };

  // Define classes for future dates, today, checked, and fail
  const defineStyles = (isDone, day) => {
    // set styles for current day (today)
    if (dayjs(day).format('DD') === todayDate.format('DD')) {
      // if we track our activity on today
      if (todayCheck) return classes.checked;
      // if we have not tracked today but it still possible (today is not expired)
      return classes.today;
    }
    // style for future days or failed track
    if (isDone === null) {
      // failed track - compare day of activity and today
      if (
        dayjs(day).set('hour', 23).set('minute', 59).set('second', 59) <
        todayDate.set('hour', 23).set('minute', 59).set('second', 59)
      ) {
        return classes.fail;
      }
      // future track with null in isDone value
      return classes.future;
    }
    // today we track activity
    if (isDone) return classes.checked;
    // we fail track
    if (!isDone) return classes.fail;
  };

  if (startDate > todayDate)
    return (
      <Wrapper className={classes.front__tomorrow}>
        <header>
          <h1>{habit.title}</h1>
        </header>
        <p>Your track starts tomorrow</p>
      </Wrapper>
    );

  return (
    <Wrapper className={classes.habit__front}>
      <header>
        <div>
          <h1>{habit.title}</h1>
        </div>
        <p>
          {habit.trackInRow} / {habit.duration}
        </p>
      </header>

      <main>
        <ul>
          {!!habit.track.length &&
            habit.track.map((item, index) => (
              <li
                key={`track_${index}_${props.habit.key}`}
                className={defineStyles(item.isDone, item.day)}
              >
                {dayjs(item.day).format('DD')}
              </li>
            ))}
        </ul>
      </main>

      <footer>
        <div>
          <input
            type='checkbox'
            id={`${habit.key}-today-check`}
            onChange={trackTodayHabitHandler}
            checked={todayCheck}
          />

          <label htmlFor={`${habit.key}-today-check`}>
            <motion.span
              className={classes.checkbox}
              animate={todayCheck ? 'checked' : 'empty'}
              variants={checkboxVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              aria-hidden={true}
            ></motion.span>
            <span className={classes.label}>Today</span>
          </label>
        </div>
        <p>from {startDate}</p>
      </footer>
    </Wrapper>
  );
}
