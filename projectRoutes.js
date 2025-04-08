const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

router.get('/', controller.getProjects);

module.exports = router;
