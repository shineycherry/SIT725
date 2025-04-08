const Project = require('../models/projectModel');

const getAllProjects = () => {
    return Project.find({});
};

module.exports = { getAllProjects };
