import React, { useRef } from 'react';
import Button from '../UI/Button';
import Wrapper from '../Wrapper/Wrapper';
import classes from './Start.module.css';

export default function Start(props) {
  // Create reference to input type text
  const nameRef = useRef();
  // Submit form ang get user name
  const submitNameHandler = (e) => {
    e.preventDefault();
    // Get current value from input
    const nameRefValue = nameRef.current.value;
    localStorage.setItem('habit-username', nameRefValue);
    props.onGetUsername(nameRefValue);
  };
  return (
    <Wrapper className={classes.block}>
      <form className={classes.form} onSubmit={submitNameHandler}>
        <input
          type='text'
          placeholder='Please, enter your name'
          ref={nameRef}
          required
        />
        <Button className={classes.button} type='submit'>
          Submit
        </Button>
      </form>
    </Wrapper>
  );
}
