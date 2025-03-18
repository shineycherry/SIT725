const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello, SIT725!');
});

app.get('/greet', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// Adding a new endpoint that adds two numbers
app.get('/add', (req, res) => {
    // Extract numbers from the query parameters
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Validate the inputs

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    // Calculate the sum
    const sum = num1 + num2;

    // Send the result as JSON
    res.json({ result: sum });
});

// Additionally Adding POST method below for existing GET routes
app.post('/add', express.json(), (req, res) => {
    const { num1, num2 } = req.body;

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    const sum = num1 + num2;
    res.json({ result: sum });
});

// Finally the end
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
