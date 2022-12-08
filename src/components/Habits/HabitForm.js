import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitForm.module.css';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const durationFields = [
  { id: '7_days', label: '7 Days', isDefault: true },
  { id: '14_days', label: '14 Days', isDefault: false },
  { id: '21_days', label: '21 Days', isDefault: false },
];

const durationValues = [7, 14, 21];

const selectDurationVariables = {
  select: {
    opacity: 1,
    scale: 1,
  },
  simple: {
    opacity: 0.7,
    scale: 0.8,
  },
};

export default function HabitForm(props) {
  // Create ref for extracting data
  const habitTitleRef = useRef();
  // Create variable state for selected duration
  const [selectedDuration, setSelectedDuration] = useState(0);

  // Add Habit to list
  const addHabitHandler = (e) => {
    e.preventDefault();

    // Value of habit title
    const habitTitleNew = habitTitleRef.current.value;
    // Start day of tracking habit
    const habitStartDate = dayjs();
    // Created date of habit (use unix for unique id)
    const createdHabitDate = dayjs().unix();
    // Duration array

    props.onAddHabit(
      habitTitleNew,
      habitStartDate,
      createdHabitDate,
      durationValues[selectedDuration]
    );
  };

  // const changeDurationHandler = (e) => {
  //   // extract only number of days from duration
  //   const [durationValue, _] = e.target.value.split('_');
  //   setDuration(Number(durationValue));
  // };

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

          {/* <div className={classes.field} onChange={changeDurationHandler}> */}
          <div className={classes.field}>
            {durationFields.map((field, index) => (
              <motion.div
                key={`duration-field_${index}`}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedDuration(index)}
                animate={selectedDuration === index ? 'selected' : 'simple'}
                variants={selectDurationVariables}
              >
                <input
                  type='radio'
                  name='duration'
                  id={field.id}
                  value={field.id}
                  defaultChecked={field.isDefault}
                />
                <label htmlFor={field.id}>{field.label}</label>
              </motion.div>
            ))}
          </div>

          <Button type='submit' className={classes.button}>
            Submit
          </Button>
        </form>
      </Wrapper>
    </motion.div>
  );
}
