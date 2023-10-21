// models
const ReportModel = require('../../models/report_model/report_model');

// add new department controller
const addreport = async (req, res) => {
    try {
        const { reportname, report_category } = req.body; // Assuming the department name is sent in the request body

        // Check if the department name is provided
        if (!reportname) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'add report',
                alert: 'Report Name is required',
                payloaddata: {}
            });
        }


        if (!report_category) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'addreport',
                alert: 'Report Category is required',
                payloaddata: {}
            });
        }

        // Create a new department instance
        const NewReportModel = new ReportModel({
            name: reportname,
            report_category: report_category
        });

        // Save the new department to the database
        const savedReport = await NewReportModel.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'addreport',
            alert: 'New Report added successfully',
            payloaddata: {}
        }); // Respond with the saved department
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'addreport',
            alert: 'Error while adding new Report',
            payloaddata: {}
        }); // Respond with the saved department
    }

}

module.exports = addreport;
