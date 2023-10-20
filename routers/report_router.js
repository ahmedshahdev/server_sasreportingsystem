const express = require('express');
const router = express.Router();

// controllers
const {addreport} = require('../controllers/report_controller/report_con');

// add new report controller
router.post('/add', addreport);

module.exports = router;