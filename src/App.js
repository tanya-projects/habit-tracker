import React, { useState } from 'react';
// import logo from './assets/logo.svg';
import classes from './App.module.css';
import Start from './components/Start/Start';
import HabitMain from './components/Habits/HabitMain';
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
      {/* <header>
        <img src={logo} alt='logo' />
      </header> */}

      <AnimatePresence mode='wait'>
        {!username && (
          <motion.div
            key='hello-form'
            exit={{ translateY: '100vh' }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            <Start onGetUsername={getUsernameHandler} />
          </motion.div>
        )}

        {!!username && (
          <motion.div key='habit-list'>
            <HabitMain username={username} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
