const OAL_REPORT_MODEL = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_REPORT_MODEL');

const controller = async (req, res) => {
    try {
        const {
            REPORT_TEMPLATE,
            ...otherFields
        } = req.body;

        // Check if the required field REPORT_TEMPLATE is provided
        if (!REPORT_TEMPLATE) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'fetchall oal report',
                alert: 'REPORT_TEMPLATE is required',
                payloaddata: {}
            });
        }

        // Check if there are existing reports with the same REPORT_TEMPLATE
        const existingReports = await OAL_REPORT_MODEL.find({
            REPORT_TEMPLATE
        });

        if (existingReports.length > 0) {
            // If matching reports exist, return them to the client
            return res.status(200).json({
                status: 'success',
                action: 'create',
                ref: 'fetchall oal report',
                alert: 'Matching oal reports already exist',
                availability: 'already-created',
                payloaddata: existingReports
            });
        }

        // Create a new report instance with REPORT_TEMPLATE and other fields
        const newReport = new OAL_REPORT_MODEL({
            REPORT_TEMPLATE,
            FLT_NO:'',
            DEST:'',
            TOB_ADULT:0,
            TOB_INF:0,
            ...otherFields
        });

        // Save the new report to the database
        const savedReport = await newReport.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'fetchall oal report',
            alert: 'New OAL Report added successfully',
            availability: 'new-created',
            payloaddata: [savedReport]
        });
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'fetchall oal report',
            alert: 'Error while fetching all oal Report',
            payloaddata: {}
        });
    }
};

module.exports = controller;