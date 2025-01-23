const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Import path module
const app = express();
const PORT = 5000;
const utils = require('./utils');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the build directory

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // Serve the frontend's index.html
    res.status(200);
});

app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./backend/db.json', 'utf8'));
  const responseData = utils.formatGetData(data);
  res.json(responseData);
  res.status(200);
});

app.get('/api/data/:month', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./backend/db.json', 'utf8'));
    const month = req.params.month;
    const filteredEntries = {};

    for (const [date, details] of Object.entries(data.workEntries)) {
        if (date.startsWith(month)) {
            filteredEntries[date] = details;
        }
    }

    if (Object.keys(filteredEntries).length > 0) {
        const formattedData = utils.formatGetData({ workEntries: filteredEntries });
        res.json(formattedData);
        res.status(200);
    } else {
        res.status(404);
        res.json({});
    }
});

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    const requiredFields = [
        'date', 'startTime', 'endTime', 'overtimeHours', 'overtimeMinutes', 'breakStart', 'breakEnd', 
        'travelTimeHours', 'travelTimeMinutes', 'fullDayAllowance', 'halfDayAllowance', 'mealCompensation', 'sick'
    ];

    for (const field of requiredFields) {
        if (!newEntry.hasOwnProperty(field)) {
            return res.status(400).send(`Missing required field: ${field}`);
        }
    }

    const data = JSON.parse(fs.readFileSync('./backend/db.json', 'utf8'));
    data.workEntries[newEntry.date] = newEntry;
    fs.writeFileSync('./backend/db.json', JSON.stringify(data, null, 2));
    res.status(201).send('Entry added successfully');
});

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});