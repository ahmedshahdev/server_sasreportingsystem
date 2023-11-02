const express = require('express');
const router = express.Router();

// controllers
const {add_user, view_users} = require('../controllers/user_controller/user_con');

// // add new report controller
router.post('/add', add_user);
router.post('/view', view_users);

module.exports = router;