// models
const ReportModel = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_REPORT_MODEL');

// delete report controller
const deletereport = async (req, res) => {
    const { report_id } = req.body;

    if (!report_id) {
        return res.status(400).json({
            status: 'failed',
            action: 'delete',
            ref: 'deletereport',
            alert: 'Report ID not found',
            payloaddata: {}
        });
    }

    try {
        // Find and delete the report by ID
        const deletedReport = await ReportModel.findByIdAndDelete(report_id);

        if (!deletedReport) {
            return res.status(404).json({
                status: 'failed',
                action: 'delete',
                ref: 'deletereport',
                alert: 'Report not found',
                payloaddata: {}
            });
        }

        res.status(200).json({
            status: 'success',
            action: 'delete',
            ref: 'deletereport',
            alert: 'Report deleted successfully',
            payloaddata: deletedReport
        });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'delete',
            ref: 'deletereport',
            alert: 'Error while deleting report',
            payloaddata: {}
        });
    }
}

module.exports = deletereport;
