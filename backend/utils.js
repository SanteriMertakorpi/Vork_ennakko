// Apufunktio joka laskee työaikoihin liittyvät tiedot
const calculateWorkingHours = (startTime, endTime, breakTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number); // Erotellaan alkamisajan tunnit ja minuutit
    const [endHours, endMinutes] = endTime.split(':').map(Number); // Etorrellaan lopetusajan tunnit ja minuutit

    const startInMinutes = startHours * 60 + startMinutes; // Kokonaisminuutit alkamisajasta
    const endInMinutes = endHours * 60 + endMinutes; // Kokonaisminuutit lopetusajasta
    const totalMinutes = endInMinutes - startInMinutes - breakTime; // Lasketaan työaika minuutteina

    const hours = Math.floor(totalMinutes / 60); // Kokonaistyöajan tunnit
    const minutes = totalMinutes % 60; // Kokonaistyöajan minuutit

    const decimalHours = parseFloat((totalMinutes / 60).toFixed(2)); // Työaika desimaalitunteina

    return {
        formatted: `${hours} h ${minutes} min`,
        decimal:decimalHours
    };
};


// Apufunktio joka laskee tauon keston minuutteina
const calculateTotalBereakTime = (breakStart, breakEnd) => {
    const [startHours, startMinutes] = breakStart.split(':').map(Number); // Erotellaan tauon alkamisajan tunnit ja minuutit
    const [endHours, endMinutes] = breakEnd.split(':').map(Number); // Erotellaan tauon lopetusajan tunnit ja minuutit
    const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes); // Lasketaan tauon kesto minuutteina
    return totalMinutes;
};

// Apufunktio joka laskee ylityötunnit
const calculateOvertimeHours = (overtimeHours, overtimeMinutes) => {
    const totalMinutes = overtimeHours * 60 + overtimeMinutes; // Lasketaan ylityöaika minuutteina

    const hoursOvertime = Math.floor(totalMinutes / 60); // Ylityöaika tunneissa
    const minutesOvertime = totalMinutes % 60; // Ylityöaika minuutteina

    return {
        formatted: `${hoursOvertime} h ${minutesOvertime} min`,	// Ylityöaika muodossa "tunnit h minuutit min"
        decimal: parseFloat((totalMinutes / 60).toFixed(2)) // Ylityöaika desimaalitunteina
    };
};

const calculateTravelTime = (travelHours, travelMinutes) => {
    const totalMinutes = travelHours * 60 + travelMinutes; // Lasketaan matka-aika minuutteina
    const totalHours = Math.floor(totalMinutes / 60); // Matka-aika tunneissa
    const totalMinutesLeft = totalMinutes % 60; // Matka-aika minuutteina

    return {
        formatted: `${totalHours} h ${totalMinutesLeft} min`, // Matka-aika muodossa "tunnit h minuutit min"
        decimal: parseFloat((totalMinutes / 60).toFixed(2)) // Matka-aika desimaalitunteina
    }
};


// Apufunktio joka muokkaa työaikamerkinnät haluttuun muotoon ennen lähettämistä
const formatGetData = (data) => {
    const updatedWorkentires = {};

    for (const [date, details] of Object.entries(data.workEntries)){ // Iteroidaan työaikamerkinnät
        const [year, month, day] = date.split('-');
        const newDate = `${day}.${month}.${year}`; // Muokataan päivämäärä muodosta vvvv-kk-pp muotoon "pp.kk.vvvv"

        const { startTime, 
            endTime, 
            overtimeHours, 
            overtimeMinutes, 
            travelTimeHours, 
            travelTimeMinutes,
            fullDayAllowance, 
            halfDayAllowance, 
            mealCompensation,
            sick, 
            breakStart,
            breakEnd} = details;

        const breakTime = breakStart=== 0 ? 0 : calculateTotalBereakTime(breakStart, breakEnd); // Lasketaan tauon kesto minuutteina käyttäen apufunktiota
        const {formatted, decimal} = calculateWorkingHours(startTime, endTime, breakTime); // Lasketaan työaika käyttäen apufunktiota

        const {formatted: formattedOverTime, decimal: decimalOverTime} = calculateOvertimeHours(overtimeHours, overtimeMinutes); // Lasketaan ylityöaika käyttäen apufunktiota

        const {formatted: formattedTravelTime, decimal: decimalTravelTime} = calculateTravelTime(travelTimeHours, travelTimeMinutes); // Lasketaan matka-aika käyttäen apufunktiota

        // Lasketaan päiväraha, puolipäiväraha ja ateriakorvaus KELAn 2025 ohjeiden mukaan
        const fullDayAllowanceAmount = fullDayAllowance ? 53 : 0; 
        const halfDayAllowanceAmount = halfDayAllowance ? 24 : 0;
        const mealCompensationAmount = mealCompensation ? 13.25 : 0;

        updatedWorkentires[newDate] = { // Formatoidaan data haluttuun muotoon
            workingHours: {
                startTime,
                endTime,
                formatted,
                decimal,
            },
            overtimeHours: {
                formatted: formattedOverTime,
                decimal: decimalOverTime,
            },
            breakTime: breakTime,
            travelTime: {
                formatted: formattedTravelTime,
                decimal: decimalTravelTime,
            },
            allowance:{
                fullDay: fullDayAllowance,
                fullDayAmount:fullDayAllowanceAmount,
                halfDay: halfDayAllowance,
                halfDayAmount: halfDayAllowanceAmount,
                meal: mealCompensation,
                mealAmount: mealCompensationAmount
            },
            sick: sick
        };
    }
    data.workEntries = updatedWorkentires;
    return data;
};

module.exports = {
    formatGetData
};