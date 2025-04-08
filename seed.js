const mongoose = require('mongoose');
const Project = require('./models/projectModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB');

// Define kitten cards
const kitten1 = new Project({
    title: "Kitten 1",
    image: "images/kitten1.jpeg",
    link: "About Kitten 1",
    description: "Demo description about kitten 1"
});

const kitten2 = new Project({
    title: "Kitten 2",
    image: "images/kitten2.jpeg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2"
});

const kitten3 = new Project({
    title: "Kitten 3",
    image: "images/kitten3.jpeg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3"
});

// Insert all kittens
Project.insertMany([kitten1, kitten2, kitten3])
    .then(() => {
        console.log("Kitten 1, 2 and 3 added successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error:", err));
