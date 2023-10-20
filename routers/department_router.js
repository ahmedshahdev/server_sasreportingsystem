const express = require('express');
const router = express.Router();

// controllers
const {adddepartment} = require('../controllers/department_controller/department_controller');

// add new department controller
router.post('/add', adddepartment);
// ! note: here no restrictions is added to avoid duplicate department names

module.exports = router;