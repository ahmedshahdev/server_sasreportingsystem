const express = require('express');
const router = express.Router();

// controllers
const {addreportcategory, viewreportcategory} = require('../controllers/report_category_controller/report_category_con');

// add new department controller
router.post('/add', addreportcategory);
// ! note: here no restrictions is added to avoid duplicate department report category name

router.post('/view', viewreportcategory);


module.exports = router;