const OAL_REPORT_MODEL = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_INAD_PASSENGER_REPORT_MODEL');

const transferOALReport = async (req, res) => {
    try {
        const {
            newreporttemplate
        } = req.body;

        // Validation
        if (!newreporttemplate) {
            return res.status(400).json({
                status: 'failed',
                action: 'update',
                ref: 'updateoal inap report',
                alert: ' newreporttemplate are required',
                payloaddata: {}
            });
        }

        // Find all OAL reports with STATUS not equal to 'clear'
        const existingOALReports = await OAL_REPORT_MODEL.find({
            STATUS: {
                $ne: 'clear'
            },
            REPORT_TEMPLATE: {
                $ne: newreporttemplate
            }
        }).populate({
            path: 'INITIAL_REPORT_TEMPLATE',
            populate: {
                path: 'SHIFT_MANAGER', // Replace 'yourNestedReference' with the actual field name
                // You can continue nesting as needed
            }
        })

        // Check if there are any reports to update
        if (!existingOALReports || existingOALReports.length === 0) {
            return res.status(404).json({
                status: 'failed',
                action: 'update',
                ref: 'transferoalreport',
                alert: 'No pending oal inad report available to transfer',
                payloaddata: {}
            });
        }

        // console.log(existingOALReports)
        // res.json(existingOALReports)
        // res.end();
        // return false;

        // Update each OAL report with the new report template
        for (const existingOALReport of existingOALReports) {
            console.log(existingOALReport)
            console.log("----- ------ ----- ----- ----- -----")
            // existingOALReport.INITIAL_REPORT_TEMPLATE = existingOALReport.REPORT_TEMPLATE;
            existingOALReport.REPORT_TEMPLATE = newreporttemplate;
            // Save each updated OAL report
            await existingOALReport.save();
        }

        // Now, use a separate query to populate the nested references
        // const populatedOALReports = await OAL_REPORT_MODEL.find({
        //     _id: {
        //         $in: existingOALReports.map(report => report._id)
        //     },
        //     STATUS: {
        //         $ne: 'clear'
        //     },
        //     REPORT_TEMPLATE: {
        //         $ne: newreporttemplate
        //     }
        // }).populate({
        //     path: 'INITIAL_REPORT_TEMPLATE',
        //     populate: {
        //         path: 'SHIFT_MANAGER', // Replace 'SHIFT_MANAGER' with the actual field name
        //         // You can continue nesting as needed
        //     }
        // });

        res.status(200).json({
            status: 'success',
            action: 'update',
            ref: 'transferoalreport',
            alert: 'OAL inadp Report updated successfully',
            payloaddata: existingOALReports
        });
    } catch (error) {
        console.error('Error updating OAL  inadp report:', error);
        res.status(500).json({
            status: 'failed',
            action: 'update',
            ref: 'transferoalreport',
            alert: 'Error while updating the OAL inad Report',
            payloaddata: {}
        });
    }
};

module.exports = transferOALReport;