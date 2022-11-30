import React, { useState } from 'react';
import logo from './assets/logo.svg';
import classes from './App.module.css';
import Start from './components/Start/Start';

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

  console.log(username);
  return (
    <div className={classes.app}>
      <header>
        <img src={logo} alt='logo' />
      </header>

      {!username && <Start onGetUsername={getUsernameHandler} />}

      {!!username && <p>Next</p>}
    </div>
  );
}

export default App;
