const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const ReportSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    report_category: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'report_category'
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

const ReportModel = mongoose.model('report', ReportSchema);
// ReportModel.createIndexes();
module.exports = ReportModel;