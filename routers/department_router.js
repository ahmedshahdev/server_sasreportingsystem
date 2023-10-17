const express = require('express');
const router = express.Router();

// controllers
const {adddepartment} = require('../controllers/department_controller/department_controller')

// add new department controller
router.get('/add', adddepartment);


module.exports = router;