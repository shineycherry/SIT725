const projectService = require('../services/projectService');

const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Error fetching projects" });
    }
};

module.exports = { getProjects };
