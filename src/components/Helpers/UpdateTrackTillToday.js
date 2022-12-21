import dayjs from 'dayjs';
import FormatDate from './FormatDate';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// export default function UpdateTrackTillToday(habit) {
//   // variable for start date of habit
//   const startDate = dayjs(habit.startDate);
//   // difference in days between now and start date
//   const daysFromStartDay = Math.floor(dayjs().diff(startDate, 'day', true));
//   console.log(daysFromStartDay, habit.track.length);
//   // if track length is equal to days from start date to today
//   if (habit.track.length - 1 === daysFromStartDay) {
//     // no changes in habit.track
//     console.log('lengths are equal');
//     return habit.track;
//   } else {
//     let trackArray = [];
//     // set dates from start date
//     for (let i = daysFromStartDay; i > -1; i--) {
//       // check if this date is added to track
//       const checkDay = habit.track.find(
//         (track) =>
//           FormatDate(track.day) === FormatDate(dayjs().subtract(i, 'day'))
//       );
//       // if this date is presented, add to track array current data from this day
//       if (checkDay) {
//         trackArray.push(checkDay);
//       } else {
//         // add this day to track with false in isDone
//         trackArray.push({ day: dayjs().subtract(i, 'day'), isDone: false });
//       }
//     }
//     return trackArray;
//   }
// }

// function UpdateTrackTill(habit) {
//   // Count difference in days from start date of tracking habit till today
//   const daysFromStart = dayjs().diff(dayjs(habit.startDate), 'day');
//   let testdatesarray = [];
//   for (let i = 0; i < daysFromStart + 2; i++) {
//     const dateTest = dayjs(habit.startDate).add(i, 'day');
//     testdatesarray.push(dateTest);
//   }
//   console.log(daysFromStart, testdatesarray);

//   // Find track with today date
//   const todayTrack = habit.track.find(
//     (track) => FormatDate(track.day) === FormatDate(dayjs())
//   );
//   console.log('Today track', todayTrack);

//   // based on if we have today track or we just started to track habit (have 0 days from start date) we don't update habit track
//   if (!daysFromStart || todayTrack) {
//     return habit.track;
//   } else {
//     let updatedTrack = [];
//     // based on days from start date we look for every date that should be in track
//     for (let day = 0; day < daysFromStart + 2; day++) {
//       const dayDate = dayjs().subtract(day, 'day');
//       const checkDayTrack = habit.track.find(
//         (track) => FormatDate(track.day) === FormatDate(dayDate)
//       );
//       // if we have this date in track, we add this date track
//       if (checkDayTrack) {
//         updatedTrack.push(checkDayTrack);
//       } else {
//         updatedTrack.push({ day: dayDate, isDone: null });
//       }
//     }

//     const addTodayToArray = [...updatedTrack.reverse()];
//     console.log('upd track & add array', updatedTrack, addTodayToArray);
//     return addTodayToArray;
//   }
// }

export default function UpdateTrackTillToday(habit) {
  // Function to count difference in dates
  const checkDatesDifference = () => {
    const startTrackingDay = dayjs(habit.startDate);

    console.log(startTrackingDay, dayjs());
  };

  checkDatesDifference();
  // Count difference in DATES (not days) from start date of tracking habit till today
  const daysFromStart = dayjs().diff(dayjs(habit.startDate), 'day');
  console.log('Days from start', daysFromStart);

  const todayTrack = habit.track.find(
    (track) => FormatDate(track.day) === FormatDate(dayjs())
  );
  if (todayTrack) {
    return habit.track;
  } else {
    const addTodayToArray = [...habit.track, { day: dayjs(), isDone: null }];
    return addTodayToArray;
  }
}
