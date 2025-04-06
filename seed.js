const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myprojectDB');

const Project = mongoose.model('Project', {
    title: String,
    image: String,
    link: String,
    description: String
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

Project.insertMany([kitten2, kitten3])
    .then(() => {
        console.log("Kitten 2 and 3 added successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error:", err));
