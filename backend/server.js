const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data formatting

const calculateWorkingHours = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
    const totalMinutes = endInMinutes - startInMinutes;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const decimalHours = parseFloat((totalMinutes / 60).toFixed(2));

    return {
        formatted: `${hours} h ${minutes} min`,
        decimal:`${decimalHours} h`
    };
};

const calculateOvertimeHours = (overtimeHours, overtimeMinutes) => {
    const totalMinutes = overtimeHours * 60 + overtimeMinutes;

    const hoursOvertime = Math.floor(totalMinutes / 60);
    const minutesOvertime = totalMinutes % 60;

    return {
        formatted: `${hoursOvertime} h ${minutesOvertime} min`,	
        decimal: `${parseFloat((totalMinutes / 60).toFixed(2))} h`
    };
};

const formatGetData = (data) => {
    const updatedWorkentires = {};

    for (const [date, details] of Object.entries(data.workEntries)){
        const [year, month, day] = date.split('-');
        const newDate = `${day}.${month}.${year}`;

        const { startTime, endTime, overtimeHours, overtimeMinutes, ...restDetails} = details;
        const {formatted, decimal} = calculateWorkingHours(startTime, endTime);

        const {formatted: formattedOverTime, decimal: decimalOverTime} = calculateOvertimeHours(overtimeHours, overtimeMinutes);

        updatedWorkentires[newDate] = {
            ...restDetails,
            workingHours: {
                startTime,
                endTime,
                formatted,
                decimal,
            },
            overtimeHours: {
                formattedOverTime,
                decimalOverTime,
            },
        };
    }
    data.workEntries = updatedWorkentires;
    return data;
};

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
    res.status(200);
});

app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
  const responseData = formatGetData(data);
  res.json(responseData);
  res.status(200);
});

app.get('/api/data/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const id = req.params.id;
    const item = data.workEntries[id];
    if (item) {
        res.json(item);
        res.status(200);
    } else {
        res.status(404).send('Entry not found');
    }
});

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    const requiredFields = [
        'date', 'startTime', 'endTime', 'overtimeHours', 'overtimeMinutes', 'breakStart', 'breakEnd', 
        'travelTime', 'fullDayAllowance', 'halfDayAllowance', 'mealCompensation', 'sick'
    ];

    for (const field of requiredFields) {
        if (!newEntry.hasOwnProperty(field)) {
            return res.status(400).send(`Missing required field: ${field}`);
        }
    }

    const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    data.workEntries[newEntry.date] = newEntry;
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
    res.status(201).send('Entry added successfully');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});