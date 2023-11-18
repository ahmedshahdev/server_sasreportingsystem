const OAL_REPORT_MODEL = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_REPORT_MODEL');

const updateOALReport = async (req, res) => {
    try {
        const { reportId, key, value } = req.body;

        // Validation
        if (!reportId || !key || value === undefined) {
            return res.status(400).json({
                status: 'failed',
                action: 'update',
                ref: 'updateoalreport',
                alert: 'reportId, key, and value are required',
                payloaddata: {}
            });
        }

        // Check if an OAL report with the given _id exists
        const existingOALReport = await OAL_REPORT_MODEL.findOne({ _id: reportId });

        if (!existingOALReport) {
            return res.status(404).json({
                status: 'failed',
                action: 'update',
                ref: 'updateoalreport',
                alert: 'OAL Report not found',
                payloaddata: {}
            });
        }

        // Update the OAL report directly
        existingOALReport[key] = value;

        // Save the updated OAL report
        const updatedOALReport = await existingOALReport.save();

        res.status(200).json({
            status: 'success',
            action: 'update',
            ref: 'updateoalreport',
            alert: 'OAL Report updated successfully',
            payloaddata: updatedOALReport
        });
    } catch (error) {
        console.error('Error updating OAL report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'update',
            ref: 'updateoalreport',
            alert: 'Error while updating the OAL Report',
            payloaddata: {}
        });
    }
};

module.exports = updateOALReport;
