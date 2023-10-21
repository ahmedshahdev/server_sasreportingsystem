const express = require('express');
const router = express.Router();

// controllers
const {addreport, viewreport} = require('../controllers/report_controller/report_con');

// add new report controller
router.post('/add', addreport);
router.post('/view', viewreport);

module.exports = router;