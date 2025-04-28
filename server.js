// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const url = 'mongodb://localhost:27017'; // your MongoDB URL
const dbName = 'smartInventoryDB';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve public folder

// Load homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add new item
app.post('/add', (req, res) => {
    const newItem = {
        title: req.body.title,
        description: req.body.description
    };

    db.collection('inventory').insertOne(newItem)
        .then(result => {
            console.log('Item added');
            io.emit('itemAdded', newItem);
            res.redirect('/');
        })
        .catch(err => console.error(err));
});

// Socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
http.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
