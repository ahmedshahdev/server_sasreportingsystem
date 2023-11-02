const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const _Schema = new Schema({
    UNDER_SHIFT: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'USERS',
        default: null
    },
    STAFF_ID: {
        type: String,
        required: false
    },
    NAME: { // Either Morning or Night letter we will decide
        type: String,
        required: false
    },
    DESIGNATION: {
        type: String,
        required: false
    },
    SUB_DESIGNATION: {
        type: String,
        required: false
    },
    COPERATE_DESIGNATION: {
        type: String,
        required: false
    },
    ADDED_DATE: {
        type: Date, // Date field for the creation date
        required: false, // You can change this to false if it's optional
        default: new Date().toISOString().split('T')[0] // Set a default value to the current date/time
    },
    ADDED_TIME: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
});

const report_template = mongoose.model('USERS', _Schema);
// report_template.createIndexes();
module.exports = report_template;