const calculateWorkingHours = (startTime, endTime, breakTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
    const totalMinutes = endInMinutes - startInMinutes - breakTime;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const decimalHours = parseFloat((totalMinutes / 60).toFixed(2));

    return {
        formatted: `${hours} h ${minutes} min`,
        decimal:decimalHours
    };
};

const calculateTotalBereakTime = (breakStart, breakEnd) => {
    const [startHours, startMinutes] = breakStart.split(':').map(Number);
    const [endHours, endMinutes] = breakEnd.split(':').map(Number);
    const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    return totalMinutes;
};

const calculateOvertimeHours = (overtimeHours, overtimeMinutes) => {
    const totalMinutes = overtimeHours * 60 + overtimeMinutes;

    const hoursOvertime = Math.floor(totalMinutes / 60);
    const minutesOvertime = totalMinutes % 60;

    return {
        formatted: `${hoursOvertime} h ${minutesOvertime} min`,	
        decimal: parseFloat((totalMinutes / 60).toFixed(2))
    };
};

const calculateTravelTime = (travelHours) => {
    const totalMinutes = travelHours * 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesLeft = totalMinutes % 60;

    return {
        formatted: `${totalHours} h ${totalMinutesLeft} min`,
        decimal: travelHours
    }
};


const formatGetData = (data) => {
    const updatedWorkentires = {};

    for (const [date, details] of Object.entries(data.workEntries)){
        const [year, month, day] = date.split('-');
        const newDate = `${day}.${month}.${year}`;

        const { startTime, 
            endTime, 
            overtimeHours, 
            overtimeMinutes, 
            travelTime, 
            fullDayAllowance, 
            halfDayAllowance, 
            mealCompensation,
            sick, 
            breakStart,
            breakEnd} = details;

        const breakTime = breakStart=== 0 ? 0 : calculateTotalBereakTime(breakStart, breakEnd);
        const {formatted, decimal} = calculateWorkingHours(startTime, endTime, breakTime);

        const {formatted: formattedOverTime, decimal: decimalOverTime} = calculateOvertimeHours(overtimeHours, overtimeMinutes);

        const {formatted: formattedTravelTime, decimal: decimalTravelTime} = calculateTravelTime(travelTime);

        const fullDayAllowanceAmount = fullDayAllowance ? 53 : 0;
        const halfDayAllowanceAmount = halfDayAllowance ? 24 : 0;
        const mealCompensationAmount = mealCompensation ? 13.25 : 0;

        updatedWorkentires[newDate] = {
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