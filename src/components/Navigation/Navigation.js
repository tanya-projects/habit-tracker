import React, { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import plus from '../../assets/plus.svg';
import classes from './Navigation.module.css';
import { BsGear, BsArchive, BsStar } from 'react-icons/bs';
import WrapNavItem from './WrapNavItem';

const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const menuItems = [
  {
    title: 'Rewards',
    icon: (
      <>
        <BsStar />
        <BsStar />
        <BsStar />
      </>
    ),
  },
  { title: 'Archive', icon: <BsArchive /> },

  {
    title: 'Setting',
    icon: <BsGear />,
  },
];

export default function Navigation(props) {
  // State for open items
  const [openItem, setOpenItem] = useState(false);
  const [openTab, setOpenTab] = useState(null);
  const displayItemHandler = (e) => {
    setOpenItem(!openItem);
    setOpenTab(e.target.closest('button').id);
  };

  return (
    <Fragment>
      <motion.nav
        className={classes.header__nav}
        {...opacityAnimation}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.ul className={classes.header__list}>
          {menuItems.map((item, index) => {
            return (
              <motion.li
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                key={`menu-item-${index}`}
              >
                <motion.button
                  id={item.title}
                  whileTap={{ scale: 0.6 }}
                  onTap={displayItemHandler}
                >
                  <p>{item.title}</p>
                  {item.icon}
                </motion.button>
              </motion.li>
            );
          })}
        </motion.ul>
        <motion.button
          {...opacityAnimation}
          transition={{ delay: 4 * 0.1 }}
          whileTap={{ scale: 0.9 }}
          onTap={props.onDisplay}
        >
          <img src={plus} alt='close menu button' />
        </motion.button>

        <AnimatePresence mode='wait'>
          {openItem && (
            <WrapNavItem
              openedTab={openTab}
              onBackToMenu={displayItemHandler}
              habits={props.habits}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </Fragment>
  );
}
