// models
const ReportModel = require('../../models/report_model/report_model');

// add new department controller
const viewreport = async (req, res) => {
    const {report_category } = req.body; 

    const filter = {};

    if (!report_category) {
        return res.status(400).json({
            status: 'failed',
            action: 'view',
            ref: 'viewreport',
            alert: 'Report Category not found',
            payloaddata: {}
        });
    }
    else {
        filter.report_category = report_category;
    }



    try {
        // Retrieve all reports from the database
        const reports = await ReportModel.find(filter);

        res.status(200).json({
            status: 'success',
            action: 'view',
            ref: 'viewreport',
            alert: 'Reports retrieved successfully',
            payloaddata: reports
        });
    } catch (error) {
        console.error('Error retrieving reports:', error);
        res.status(500).json({
            status: 'failed',
            action: 'view',
            ref: 'viewreport',
            alert: 'Error while retrieving reports',
            payloaddata: []
        });
    }
}

module.exports = viewreport;