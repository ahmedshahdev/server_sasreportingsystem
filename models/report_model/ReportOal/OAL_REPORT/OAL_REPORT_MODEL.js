const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const _Schema = new Schema({
    SL_NO: {
        type: String,
        required: false
    },
    FLT_NO: {
        type: String,
        required: false
    },
    DEST: {
        type: String,
        required: false
    },
    STD: {
        type: String,
        required: false
    },
    ATD: {
        type: String,
        required: false
    },
    TOB_ADULT: {
        type: String,
        required: false
    },
    TOB_INF: {
        type: String,
        required: false
    },
    REPORT_TEMPLATE: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'REPORT_TEMPLATE'
    },
    DATE: {
        type: Date, // Date field for the creation date
        required: false, // You can change this to false if it's optional
        default: Date.now // Set a default value to the current date/time
    },
    TIME: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
    ADDED_DATE: {
        type: Date, // Date field for the creation date
        required: false, // You can change this to false if it's optional
        default: Date.now // Set a default value to the current date/time
    },
    ADDED_TIME: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
});

const OAL_REPORT_MODEL = mongoose.model('OAL_REPORT_DEFAULT', _Schema);
// OAL_REPORT_MODEL.createIndexes();
module.exports = OAL_REPORT_MODEL;