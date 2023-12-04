const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const _Schema = new Schema({
    STATUS: {
        type: String,
        required: false,
        default: "INITIAL"
    },
    NAME: {
        type: String,
        required: false
    },
    AIRLINE: {
        type: String,
        required: false,
    },
    DEP_ARRV_FLIGHT: {
        type: String,
        required: false
    },
    SECTOR: {
        type: String,
        required: false
    },
    NATIONALITY: {
        type: String,
        required: false
    },
    PNR: {
        type: String,
        required: false
    },
    REMARKS: {
        type: String,
        required: false
    },
    ACTION: {
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
        default: new Date().toISOString().split('T')[0]
    },
    TIME: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
    ADDED_DATE: {
        type: Date, // Date field for the creation date
        required: false, // You can change this to false if it's optional
        default: new Date().toISOString().split('T')[0]
    },
    ADDED_TIME: {
        type: String, // String field for the creation time (you can use a different data type if needed)
        required: false, // You can change this to false if it's optional
        default: new Date().toLocaleTimeString() // Set a default value to the current time
    },
});

const MODEL = mongoose.model('OAL_REPORT_INAD_PASSENGER', _Schema);
// MODEL.createIndexes();
module.exports = MODEL;