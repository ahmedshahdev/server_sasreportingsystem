const OAL_REPORT_MODEL = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_INAD_PASSENGER_REPORT_MODEL');

const controller = async (req, res) => {
    try {
        const { REPORT_TEMPLATE, ...otherFields } = req.body;

        // Check if the required field REPORT_TEMPLATE is provided
        if (!REPORT_TEMPLATE) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'add oal inadp report',
                alert: 'REPORT_TEMPLATE is required',
                payloaddata: {}
            });
        }

        // Create a new report instance
        const newReport = new OAL_REPORT_MODEL({
            REPORT_TEMPLATE,
            INITIAL_REPORT_TEMPLATE: REPORT_TEMPLATE,
            STATUS: 'INITIAL',
            NAME:'',
            AIRLINE: '',
            DEP_ARRV_FLIGHT:'',
            SECTOR:'',
            NATIONALITY:'',
            PNR:'',
            REMARKS:'',
            ...otherFields
        });

        // Save the new report to the database
        const savedReport = await newReport.save();

        // Populate the REPORT_TEMPLATE field with the actual data from the referenced model
        await savedReport.populate({
            path: 'INITIAL_REPORT_TEMPLATE',
            populate: {
                path: 'SHIFT_MANAGER', // Replace 'yourNestedReference' with the actual field name
                // You can continue nesting as needed
            }
        })

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'add oal report',
            alert: 'New OAL inadp Report added successfully',
            payloaddata: savedReport
        });
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'add oal inadp report',
            alert: 'Error while adding new OAL Report',
            payloaddata: {}
        });
    }
};

module.exports = controller;
