import React, { useState } from 'react';
import classes from './Rewards.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function Rewards(props) {
  // console.log(props.habits);
  const rewards = [
    {
      img: 'FirstTrack',
      description: 'Finish tracking any habit',
      lock: true,
      achieved: null,
    },
    {
      img: '7days',
      description: 'Finish tracking habit with 7 days duration',
      lock: true,
      achieved: null,
    },
    {
      img: '14days',
      description: 'Finish tracking habit with 14 days duration',
      lock: true,
      achieved: null,
    },
    {
      img: '21days',
      description: 'Finish tracking habit with 21 days duration',
      lock: true,
      achieved: null,
    },
    {
      img: '5habits',
      description: 'Finish tracking 5 habits',
      lock: true,
      achieved: null,
    },
    {
      img: '7to5',
      description: 'Finish tracking 5 habits with 7 days duration',
      lock: true,
      achieved: null,
    },
    {
      img: '14to5',
      description: 'Finish tracking 5 habits with 14 days duration',
      lock: true,
      achieved: null,
    },
    {
      img: '21to5',
      description: 'Finish tracking 5 habits with 21 days duration',
      lock: true,
      achieved: null,
    },
  ];
  const [openRewardDescription, setOpenRewardDescription] = useState(null);

  const displayDescription = (index) => {
    setOpenRewardDescription(index);
  };

  ////////////
  // Variants
  const rewardVariants = {
    back: { scale: 0 },
    front: { scale: 1 },
  };

  ////////////

  return (
    <ul className={classes.rewards}>
      <AnimatePresence mode='wait'>
        {rewards.map((reward, index) => (
          <motion.li key={`reward-${reward.img}`} whileTap={{ scale: 0.9 }}>
            <motion.img
              src={require(`../../assets/rewards/${reward.img}-${
                reward.lock ? 'lock' : 'unlock'
              }.svg`)}
              animate={openRewardDescription === index ? 'back' : 'front'}
              variants={rewardVariants}
              onTap={() => {
                displayDescription(index);
              }}
            />

            <motion.p
              className={openRewardDescription === index ? '' : classes.hidden}
              animate={openRewardDescription === index ? 'front' : 'back'}
              variants={rewardVariants}
              exit={{ scale: 0 }}
              onTap={() => {
                setOpenRewardDescription(null);
              }}
            >
              {reward.description}
              {!reward.lock ? <span>{reward.achieved}</span> : ''}
            </motion.p>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
