import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitForm.module.css';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const dateFields = [
  { id: 'today', label: 'Today', isDefault: true },
  { id: 'tomorrow', label: 'Tomorrow', isDefault: false },
];
const durationFields = [
  { id: '7_days', label: '7 Days', isDefault: true },
  { id: '14_days', label: '14 Days', isDefault: false },
  { id: '21_days', label: '21 Days', isDefault: false },
];

const selectVariables = {
  select: {
    opacity: 1,
    background: 'var(--color-01)',
    color: 'var(--color-05)',
  },
  deselect: {
    opacity: 0.5,
    background: 'transparent',
    color: 'var(--color-01)',
  },
};

export default function HabitForm(props) {
  // Create ref for extracting data
  const habitTitleRef = useRef();
  // Create variable state for start date
  const [startDate, setStartDate] = useState('today');
  const [duration, setDuration] = useState(7);

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

    props.onAddHabit(habitTitleNew, habitStartDate, createdHabitDate, duration);
  };

  // Set start date value on onchange
  const changeStartDateHandler = (e) => {
    setStartDate(e.target.value);
  };

  const changeDurationHandler = (e) => {
    // extract only number of days from duration
    const [durationValue, _] = e.target.value.split('_');
    setDuration(Number(durationValue));
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

          <div className={classes.field} onChange={changeStartDateHandler}>
            <p>Start Date:</p>

            {dateFields.map((field, index) => (
              <motion.div
                key={`date-field_${index}`}
                transition={{ duration: 0.3 }}
              >
                <input
                  type='radio'
                  name='start-date'
                  id={field.id}
                  value={field.id}
                  defaultChecked={field.isDefault}
                />
                <label htmlFor={field.id}>{field.label}</label>
              </motion.div>
            ))}
          </div>

          <div className={classes.field} onChange={changeDurationHandler}>
            <p>Duration:</p>
            {durationFields.map((field, index) => (
              <motion.div
                key={`duration-field_${index}`}
                transition={{ duration: 0.3 }}
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
            {/* <div>
              <input
                type='radio'
                name='duration'
                id='7_days'
                value='7_days'
                defaultChecked
              />
              <label className={classes.select} htmlFor='7_days'>
                7 days
              </label>
            </div> */}
            {/* <div>
              <input
                type='radio'
                name='duration'
                id='14_days'
                value='14_days'
              />
              <label htmlFor='14_days'>14 days</label>
            </div>
            <div>
              <input
                type='radio'
                name='duration'
                id='21_days'
                value='21_days'
              />
              <label htmlFor='21_days'>21 days</label>
            </div> */}
          </div>
          {/* <div
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
          </div> */}

          {/* <div className={classes.duration} onChange={changeDurationHandler}>
            <div>
              <input
                type='radio'
                name='duration'
                id='7_days'
                value='7_days'
                defaultChecked
              />
              <label className={classes.select} htmlFor='7_days'>
                7 days
              </label>
            </div>
            <div>
              <input
                type='radio'
                name='duration'
                id='14_days'
                value='14_days'
              />
              <label htmlFor='14_days'>14 days</label>
            </div>
            <div>
              <input
                type='radio'
                name='duration'
                id='21_days'
                value='21_days'
              />
              <label htmlFor='21_days'>21 days</label>
            </div>
          </div> */}

          <Button type='submit' className={classes.button}>
            Submit
          </Button>
        </form>
      </Wrapper>
    </motion.div>
  );
}
