const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items'); // Correct route import

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Smart Inventory Manager');
});

mongoose.connect('mongodb://localhost:27017/inventory_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
