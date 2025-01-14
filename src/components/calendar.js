import React, { useState } from "react";

const getWeek = (startDate) => {
  const week = [];
  const date = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return week;
};

const getCurrentWeekStart = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(now.setDate(diff));
};

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentWeekStart());

  const nextWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)));
  };

  const prevWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)));
  };

  const currentWeek = getWeek(currentWeekStart);
  const monthName = currentWeekStart.toLocaleString('fi-FI', { month: 'long' });
  const weekNumber = getWeekNumber(currentWeekStart);
  const dayNames = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
  const dayNumbers = currentWeek.map(date => date.getDate());

  return (
    <div className="p-4 rounded-sm">
      <div className="flex justify-between items-center">
        <button onClick={prevWeek}>&lt;</button>
        <h3>{monthName}, vko {weekNumber}</h3>
        <button onClick={nextWeek}>&gt;</button>
      </div>
      <div>
        <div className="flex justify-between items-center">
          {dayNames.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {dayNumbers.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

