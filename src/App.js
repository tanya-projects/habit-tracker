import React, { useState } from 'react';
import logo from './assets/logo.svg';
import classes from './App.module.css';
import Start from './components/Start/Start';
import HabitList from './components/Habits/HabitList';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  // Create state for tracking User Name and start displaying habits
  const [username, setUsername] = useState(() => {
    if (localStorage.getItem('habit-username')) {
      return localStorage.getItem('habit-username');
    } else {
      return '';
    }
  });

  const getUsernameHandler = (name) => {
    setUsername(name);
  };

  return (
    <div className={classes.app}>
      <header>
        <img src={logo} alt='logo' />
      </header>
      <AnimatePresence>
        {!username && (
          <motion.div
            key='hello-form'
            exit={{ translateY: '100vh' }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            <Start onGetUsername={getUsernameHandler} />
          </motion.div>
        )}
      </AnimatePresence>

      {!!username && <HabitList username={username} />}
    </div>
  );
}

export default App;
