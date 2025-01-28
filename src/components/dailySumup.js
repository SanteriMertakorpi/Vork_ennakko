import React from "react";


/**
 * 
 * @param {*} summaryData Työpäivän yhteenveto 
 * @param {*} setSummaryData Funktio joka asettaa työpäivän yhteenvedon
 * @returns Sivu joka näyttää työpäivän yhteenvedon
 */
const DailySumup = ({ summaryData, setSummaryData }) => {
  return (
    <div className="p-4 bg-white rounded-md m-6 relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => {setSummaryData(null); localStorage.removeItem("workdayInformation")}}
      >
        X
      </button>
      <h2 className="text-xl font-bold mb-4">Päivän yhteenveto</h2>
      <p>Päivämäärä: {summaryData.date}</p>
      <p>Aloitusaika: {summaryData.startTime}</p>
      <p>Lopetusaika: {summaryData.endTime}</p>
      <p>Ylityötunnit: {summaryData.overtimeHours} h {summaryData.overtimeMinutes} min</p>
      <p>Tauon aloitusaika: {summaryData.breakStart}</p>
      <p>Tauon lopetusaika: {summaryData.breakEnd}</p>
      <p>Matkustusaika: {summaryData.travelTimeHours} h {summaryData.travelTimeMinutes} min</p>
      <p>Kokopäiväraha: {summaryData.fullDayAllowance ? "Kyllä" : "Ei"}</p>
      <p>Osapäiväraha: {summaryData.halfDayAllowance ? "Kyllä" : "Ei"}</p>
      <p>Ateriakorvaus: {summaryData.mealCompensation ? "Kyllä" : "Ei"}</p>
      <p>Sairaana: {summaryData.sick ? "Kyllä" : "Ei"}</p>
    </div>
  );
};

export default DailySumup;