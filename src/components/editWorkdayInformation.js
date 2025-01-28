import React, { useState } from "react";


/**
 * 
 * @param {Date} date 
 * @returns Päivämäärä muodossa vvvv-kk-pp
 */
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * 
 * @param {*} onCancel Peruuta-napin toiminto
 * @param {*} onAccept Hyväksy-napin toiminto
 * @param {Date} startTime Työpäivän aloitusaika
 * @param {Date} stopTime Työpäivän lopetusaika
 * @param {Date} breakStartTime Tauon aloitusaika
 * @param {Date} breakEndTime Tauon lopetusaika
 * @returns Komponentti, joka näyttää työpäivän tiedot ja mahdollistaa niiden muokkaamisen
 */
const EditWorkdayInformation = ({ onCancel, onAccept, startTime, stopTime, breakStartTime, breakEndTime }) => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [startTimeState, setStartTimeState] = useState(startTime);
  const [endTimeState, setEndTimeState] = useState(stopTime);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [overtimeMinutes, setOvertimeMinutes] = useState(0);
  const [breakStart, setBreakStart] = useState(breakStartTime);
  const [breakEnd, setBreakEnd] = useState(breakEndTime);
  const [travelTimeHours, setTravelTimeHours] = useState(0);
  const [travelTimeMinutes, setTravelTimeMinutes] = useState(0);
  const [fullDayAllowance, setFullDayAllowance] = useState(false);
  const [halfDayAllowance, setHalfDayAllowance] = useState(false);
  const [mealCompensation, setMealCompensation] = useState(false);
  const [sick, setSick] = useState(false);

  return (
    <div className="p-4 bg-white rounded-md m-6">
      <h2 className="text-xl font-bold mb-4">Päivän yhteenveto</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Päivämäärä</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Aloitusaika</label>
        <input
          type="time"
          value={startTimeState}
          onChange={(e) => setStartTimeState(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Lopetusaika</label>
        <input
          type="time"
          value={endTimeState}
          onChange={(e) => setEndTimeState(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ylityötunnit</label>
        <div className="flex items-center">
          <input
            type="number"
            value={overtimeHours}
            onChange={(e) => setOvertimeHours(e.target.value)}
            className="mt-1 block w-16 border border-gray-300 rounded-md shadow-sm"
          />
          <span className="mx-2">h</span>
          <input
            type="number"
            value={overtimeMinutes}
            onChange={(e) => setOvertimeMinutes(e.target.value)}
            className="mt-1 block w-16 border border-gray-300 rounded-md shadow-sm"
          />
          <span className="ml-2">min</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tauon aloitusaika</label>
        <input
          type="time"
          value={breakStart}
          onChange={(e) => setBreakStart(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tauon lopetusaika</label>
        <input
          type="time"
          value={breakEnd}
          onChange={(e) => setBreakEnd(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Matkustusaika</label>
        <div className="flex items-center">
          <input
            type="number"
            value={travelTimeHours}
            onChange={(e) => setTravelTimeHours(e.target.value)}
            className="mt-1 block w-16 border border-gray-300 rounded-md shadow-sm"
          />
          <span className="mx-2">h</span>
          <input
            type="number"
            value={travelTimeMinutes}
            onChange={(e) => setTravelTimeMinutes(e.target.value)}
            className="mt-1 block w-16 border border-gray-300 rounded-md shadow-sm"
          />
          <span className="ml-2">min </span>
        </div>
        
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Kokopäiväraha</label>
        <input
          type="checkbox"
          checked={fullDayAllowance}
          onChange={(e) => setFullDayAllowance(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Osapäiväraha</label>
        <input
          type="checkbox"
          checked={halfDayAllowance}
          onChange={(e) => setHalfDayAllowance(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ateriakorvaus</label>
        <input
          type="checkbox"
          checked={mealCompensation}
          onChange={(e) => setMealCompensation(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sairaana</label>
        <input
          type="checkbox"
          checked={sick}
          onChange={(e) => setSick(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Peruuta
        </button>
        <button
          onClick={() => onAccept({ date, startTimeState, endTimeState, overtimeHours, overtimeMinutes, breakStart, breakEnd, travelTimeHours, travelTimeMinutes, fullDayAllowance, halfDayAllowance, mealCompensation, sick })}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Hyväksy
        </button>
      </div>
    </div>
  );
};

export default EditWorkdayInformation;
