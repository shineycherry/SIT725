const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB');
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

// Schema and Model
const Project = mongoose.model('Project', {
    title: String,
    image: String,
    link: String,
    description: String
});

// REST API
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
});

// Start Server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
