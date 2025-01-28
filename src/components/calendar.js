import React from "react";

/**
 * Funktio, joka palauttaa viikon päivät annetusta päivästä
 * @param {Date} startDate Viikon ensimmäinen päivä
 * @returns Kyseisen viikon päivät
 */
const getWeek = (startDate) => {
  const week = [];
  const date = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return week;
};

/**
 * 
 * @returns Nykyisen viikon ensimmäinen päivä
 */
const getCurrentWeekStart = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Sunnuntai on viikon viimeinen päivä
  return new Date(now.setDate(diff));
};

/**
 * Selvittää annetun päivän viikon numeron
 * @param {Date} date Päivä, jonka viikon numero halutaan selvittää
 * @returns Viiikon numero
 */
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1); // Vuoden ensimmäinen päivä
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000; // Kuluneet päivät vuoden alusta
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) === 53 ? 1: Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7); // Viikon numero
};


/**
 * Kaleterinäkymä, joka näyttää nykyisen viikon päivät
 * Ympyrässä oleva päivä on nykyinen päivä
 * @returns Kalenterinäkymä
 */
const Calendar = () => {
  const currentWeekStart  = getCurrentWeekStart(); // Nykyisen viikon ensimmäinen päivä
  const currentDay = new Date().getDate();


  const currentWeek = getWeek(currentWeekStart); // Nykyisen viikon päivät
  // Muutetaan kuukauden nimi alkamaan isolla kirjaimella ja esitetään se laitteen kielellä
  const monthName = currentWeekStart.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentWeekStart.toLocaleString('default', { month: 'long' }).slice(1); 
  const weekNumber = getWeekNumber(currentWeekStart);
  const dayNames = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
  const dayNumbers = currentWeek.map(date => date.getDate()); // Päivämäärät

  return (
    <div className="p-4 rounded-t-3xl bg-stone-100 border-b-2">
      <div className="flex justify-center mb-4 pl-6 pr-6 text-navbarbackground ">
        
        <h3 className="text-lg font-semibold">{monthName}, vko {weekNumber}</h3>
        
      </div>
      <div>
        <div className="flex justify-between items-center mb-4 pl-6 pr-6 text-navbarbackground font-bold">
          {dayNames.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4 pl-6 pr-6 text-navbarbackground">
          {dayNumbers.map((day, index) => (
            <div key={index} className={day === currentDay ? "bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center" : ""}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

