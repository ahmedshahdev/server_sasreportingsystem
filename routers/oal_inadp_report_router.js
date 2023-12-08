const express = require('express');
const router = express.Router();

// controllers
const {add_oal_inadp_report_con, fetchall_oal_inadp_report_con, update_oal_inadp_report_con,  delate_oal_inadp_report_con, transfer_oal_inadp_report_con} = require('../controllers/oal_inadp_report_controller/oal_inadp_report_con');

// add new department controller
router.post('/add', add_oal_inadp_report_con);
router.post('/fetchall', fetchall_oal_inadp_report_con);
router.post('/update', update_oal_inadp_report_con);
router.post('/delete', delate_oal_inadp_report_con);
router.post('/transfer', transfer_oal_inadp_report_con);
// // ! note: here no restrictions is added to avoid duplicate department report category name

// router.post('/view', viewreportcategory);


module.exports = router;