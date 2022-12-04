import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitForm.module.css';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

export default function HabitForm(props) {
  // Create ref for extracting data
  const habitTitleRef = useRef();
  // Create variable state for start date
  const [startDate, setStartDate] = useState('today');

  // Add Habit to list
  const addHabitHandler = (e) => {
    e.preventDefault();

    // Value of habit title
    const habitTitleNew = habitTitleRef.current.value;

    // Start day of tracking habit
    let habitStartDate;
    if (startDate === 'today') {
      habitStartDate = dayjs();
    } else {
      habitStartDate = dayjs().add(1, 'day');
    }

    // Created date of habit (use unix for unique id)
    const createdHabitDate = dayjs().unix();

    props.onAddHabit(habitTitleNew, habitStartDate, createdHabitDate);
  };

  // Set start date value on onchange
  const changeStartDateHandler = (e) => {
    setStartDate(e.target.value);
  };
  return (
    <motion.div
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ translateX: '100vw' }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper className={classes.adding__form}>
        <form onSubmit={addHabitHandler} autoComplete='off'>
          <input
            id='habit-title'
            type='text'
            placeholder='Habit Title'
            ref={habitTitleRef}
            required={true}
          />

          <div
            className={classes.start__dates}
            onChange={changeStartDateHandler}
          >
            <div>
              <input
                type='radio'
                name='start-date'
                id='today'
                value='today'
                defaultChecked
              />
              <label htmlFor='today'>From Today</label>
            </div>
            <div>
              <input
                type='radio'
                name='start-date'
                id='tomorrow'
                value='tomorrow'
              />
              <label htmlFor='tomorrow'>From Tomorrow</label>
            </div>
          </div>
          <Button type='submit' className={classes.button}>
            Submit
          </Button>
        </form>
      </Wrapper>
    </motion.div>
  );
}
