import React from 'react';

export default function Archive(props) {
  const expiredHabits = props.habits.find((habit) => habit.expired);
  console.log(expiredHabits);
  if (!expiredHabits) {
    return <div>No habits</div>;
  }
  return <div>Archive</div>;
}
