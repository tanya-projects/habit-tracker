import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import classes from './HabitFront.module.css';

export default function HabitFront(props) {
  return (
    <Wrapper className={classes.habit__front}>
      <header>
        <h1>{props.habit.title}</h1>
      </header>
      <ul>
        <li>
          <input type='checkbox' id='day-1-month-1' />
          <label htmlFor='day-1-month-1'>1</label>
        </li>
        <li>
          <input type='checkbox' id='day-2-month-2' />
          <label htmlFor='day-2-month-2'>2</label>
        </li>
        <li>
          <input type='checkbox' id='day-3-month-3' />
          <label htmlFor='day-3-month-3'>3</label>
        </li>
        <li>
          <input type='checkbox' id='day-4-month-4' />
          <label htmlFor='day-4-month-4'>4</label>
        </li>
        <li>
          <input type='checkbox' id='day-5-month-5' />
          <label htmlFor='day-5-month-5'>5</label>
        </li>
        <li>
          <input type='checkbox' id='day-6-month-6' />
          <label htmlFor='day-6-month-6'>6</label>
        </li>
        <li>
          <input type='checkbox' id='day-7-month-7' />
          <label htmlFor='day-7-month-7'>7</label>
        </li>
      </ul>

      <footer>from {props.habit.startDate}</footer>
    </Wrapper>
  );
}
