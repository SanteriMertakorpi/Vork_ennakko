const express = require('express');
const fs = require('fs');
const path = require('path'); // Import path module
const app = express();
const PORT = 5000;
const utils = require('./utils');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))); // Palvelin tarjoaa frontendin build-kansion staattiset tiedostot

// Routes

// Palvelinhakemiston juuri ohjataan frontendin build-kansion index.html-tiedostoon
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

// Palauttaa kaikki työaikamerkinnät
app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8')); // Luetaan "tietokannasta" data
  const responseData = utils.formatGetData(data); // Formatoidaan data ennen palautusta
  res.json(responseData);
  res.status(200);
});

// Palauttaa työaikamerkinnät annetulta kuukaudelta
app.get('/api/data/:month', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf8')); //Luetaan "tietokannasta" data
    const month = req.params.month; // Haetaan kuukausi palvelinpyynnön parametreista
    const filteredEntries = {};

    for (const [date, details] of Object.entries(data.workEntries)) { // Iteroidaan työaikamerkinnät ja haetaan annetun kuukauden merkinnät
        if (date.startsWith(month)) {
            filteredEntries[date] = details;
        }
    }

    if (Object.keys(filteredEntries).length > 0) { // Jos merkintöjä löytyy, formatoidaan ja palautetaan ne
        const formattedData = utils.formatGetData({ workEntries: filteredEntries });
        res.json(formattedData);
        res.status(200);
    } else { // Jos merkintöjä ei löydy, palautetaan tyhjä objekti
        res.status(404);
        res.json({});
    }
});

// Lisää uuden työaikamerkinnän
app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    const requiredFields = [
        'date', 'startTime', 'endTime', 'overtimeHours', 'overtimeMinutes', 'breakStart', 'breakEnd', 
        'travelTimeHours', 'travelTimeMinutes', 'fullDayAllowance', 'halfDayAllowance', 'mealCompensation', 'sick'
    ];

    for (const field of requiredFields) { // Tarkistetaan, että kaikki pakolliset kentät löytyvät pyynnöstä
        if (!newEntry.hasOwnProperty(field)) {
            return res.status(400).send(`Missing required field: ${field}`);
        }
    }

    const data = JSON.parse(fs.readFileSync('./db.json', 'utf8')); // Luetaan "tietokannasta" data
    data.workEntries[newEntry.date] = newEntry;
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2)); // Kirjoitetaan päivitetty data takaisin "tietokantaan"
    res.status(201).send('Entry added successfully');
});

// Mikäli pyydettyä reittiä ei löydy, palautetaan frontendin index.html-tiedosto
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});