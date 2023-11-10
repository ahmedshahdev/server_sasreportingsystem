const express = require('express');
const dbconnect = require('./config/dbconnect.js');
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

// DB Connection
dbconnect();

const app = express();
const port = 5000;

// allow json body
app.use(cors());
app.use(express.json({
  limit: '10mb'
}));

// routes
app.get('/', (req, res) => {
  res.send('Server is listening!')
})

// external routes
app.use('/departments', require('./routers/department_router.js'));
app.use('/reportcategory', require('./routers/report_category_router.js'));
app.use('/report', require('./routers/report_router.js'));
app.use('/reporttemplate', require('./routers/report_template_router.js'));
app.use('/users', require('./routers/user_router.js'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})