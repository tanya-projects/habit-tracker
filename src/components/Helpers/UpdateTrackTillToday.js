import dayjs from 'dayjs';
import FormatDate from './FormatDate';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function UpdateTrackTillToday(habit) {
  // variable for start date of habit
  const startDate = dayjs(habit.startDate);
  // difference in days between now and start date
  const daysFromStartDay = Math.floor(dayjs().diff(startDate, 'day', true));

  // if track length is equal to days from start date to today
  if (habit.track.length === daysFromStartDay) {
    // no changes in habit.track
    return habit.track;
  } else {
    let trackArray = [];
    // set dates from start date
    for (let i = daysFromStartDay; i > -1; i--) {
      // check if this date is added to track
      const checkDay = habit.track.find(
        (track) =>
          FormatDate(track.day) === FormatDate(dayjs().subtract(i, 'day'))
      );
      // if this date is presented, add to track array current data from this day
      if (checkDay) {
        trackArray.push(checkDay);
      } else {
        // add this day to track with false in isDone
        trackArray.push({ day: dayjs().subtract(i, 'day'), isDone: false });
      }
    }

    return trackArray;
  }
}
