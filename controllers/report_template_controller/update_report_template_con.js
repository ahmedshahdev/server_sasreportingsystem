// Import the ReportTemplateModel at the top of your file
const ReportTemplateModel = require('../../models/report_model/report_template_model'); // Adjust the path accordingly

// Update report template by REPORT_ID
const updateReportTemplate = async (req, res) => {
    try {
        const { REPORT_ID, updates } = req.body;

        // Validation
        if (!REPORT_ID || !updates) {
            return res.status(400).json({
                status: 'failed',
                action: 'update',
                ref: 'updatereporttemplate',
                alert: 'REPORT_ID and updates are required',
                payloaddata: {}
            });
        }

        // Check if a report with the given REPORT_ID exists
        const existingReport = await ReportTemplateModel.findOne({ _id: REPORT_ID });

        if (!existingReport) {
            return res.status(404).json({
                status: 'failed',
                action: 'update',
                ref: 'updatereporttemplate',
                alert: 'Report not found',
                payloaddata: {}
            });
        }

        // Update the report with the provided key-value pairs
        for (const key in updates) {
            existingReport[key] = updates[key];
        }

        // Save the updated report
        const updatedReport = await existingReport.save();

        res.status(200).json({
            status: 'success',
            action: 'update',
            ref: 'updatereporttemplate',
            alert: 'Report updated successfully',
            payloaddata: updatedReport
        });
    } catch (error) {
        console.error('Error updating report template:', error);
        res.status(500).json({
            status: 'failed',
            action: 'update',
            ref: 'updatereporttemplate',
            alert: 'Error while updating the Report Template',
            payloaddata: {}
        });
    }
};

module.exports = updateReportTemplate
