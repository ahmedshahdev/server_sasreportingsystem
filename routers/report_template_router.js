const express = require('express');
const router = express.Router();

// controllers
const {addreporttemplate, updatereporttemplate} = require('../controllers/report_template_controller/report_template_con');

// add new report controller
router.post('/add', addreporttemplate);
router.post('/update', updatereporttemplate);
// router.post('/view', viewreport);

module.exports = router;