const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const DepartmentModel = new Schema({
    name: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date, // Date field for the creation date
        required: false, // You can change this to false if it's optional
        default: Date.now // Set a default value to the current date/time
    },
    createdTime: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
});

const ActionRecordModel = mongoose.model('departments', DepartmentModel);
// ActionRecordModel.createIndexes();
module.exports = ActionRecordModel;