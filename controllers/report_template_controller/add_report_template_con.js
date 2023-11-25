// models
const ReportTemplateModel = require('../../models/report_model/report_template_model');

// add new department controller
const addreporttemplate = async (req, res) => {
    try {
        const { REPORT_ID, SHIFT, DATE, SHIFT_MANAGER } = req.body;

        // validation 
        if (!REPORT_ID) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'addreporttemplate',
                alert: 'REPORT_ID is required',
                payloaddata: {}
            });
        }

        if (!SHIFT) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'addreporttemplate',
                alert: 'SHIFT is required',
                payloaddata: {}
            });
        }

        // if (!SHIFT_MANAGER) {
        //     return res.status(400).json({
        //         status: 'failed',
        //         action: 'create',
        //         ref: 'addreporttemplate',
        //         alert: 'SHIFT_MANAGER is required',
        //         payloaddata: {}
        //     });
        // }


        // Check if a report with the same REPORT_ID, DATE, and SHIFT exists
        const existingReport = await ReportTemplateModel.findOne({
            REPORT_ID,
            DATE,
            SHIFT
        }).populate('REPORT_ID').populate("SHIFT_MANAGER");

        if (existingReport) {
            // If a matching report exists, return it to the client
            return res.status(200).json({
                status: 'success',
                action: 'create',
                ref: 'addreporttemplate',
                alert: 'Matching report already exists',
                availabilty: 'already-created',
                payloaddata: existingReport
            });
        }

        const newReportTemplate = await  ReportTemplateModel({
            REPORT_ID,
            SHIFT,
            SHIFT_MANAGER,
            DATE
        }).populate("REPORT_ID")

        const savedReportTemplate = await newReportTemplate.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'addreporttemplate',
            alert: 'New Report Template added successfully',
            availabilty: 'new-created',
            payloaddata: savedReportTemplate
        });
    } catch (error) {
        console.error('Error adding report template:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'addreporttemplate',
            alert: 'Error while adding a new Report Template',
            payloaddata: {}
        });
    }
}

module.exports = addreporttemplate;
