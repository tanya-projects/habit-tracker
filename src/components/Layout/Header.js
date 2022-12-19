import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import plus from '../../assets/plus.svg';
import classes from './Header.module.css';
import Navigation from '../Navigation/Navigation';

const headerButtonVariants = {
  open: {
    rotate: 225,
    scale: [0.9, 1, 0.8],
    background: 'var(--color-red)',
  },
  closed: { rotate: 0, scale: 1, background: 'var(--color-03)' },
};

// main animation with opacity
const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
    props.onHideForm();
  };

  return (
    <motion.header className={classes.app__header} {...opacityAnimation}>
      <motion.button
        className={classes.header__menu}
        whileTap={{ scale: 0.8 }}
        onTap={displayMenuHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </motion.button>

      <motion.p>Hello, {props.username}!</motion.p>

      <motion.button
        className={classes.header__action}
        whileTap={{ scale: 0.8 }}
        onTap={props.onDisplayForm}
        animate={props.isFormOpen ? 'open' : 'closed'}
        variants={headerButtonVariants}
        transition={{ duration: 0.2 }}
      >
        <img src={plus} alt='plus or cross sign' />
      </motion.button>

      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <Navigation onDisplay={displayMenuHandler} habits={props.habits} />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
