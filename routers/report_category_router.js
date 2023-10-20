const express = require('express');
const router = express.Router();

// controllers
const {addreportcategory} = require('../controllers/report_category_controller/report_category_con');

// add new department controller
router.post('/add', addreportcategory);
// ! note: here no restrictions is added to avoid duplicate department report category name

module.exports = router;