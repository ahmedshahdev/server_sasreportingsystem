const OAL_REPORT_MODEL = require('../../models/report_model/ReportOal/OAL_REPORT/OAL_INAD_PASSENGER_REPORT_MODEL');

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
                ref: 'fetchall oal inadp report',
                alert: 'REPORT_TEMPLATE is required',
                payloaddata: {}
            });
        }

        // Check if there are existing reports with the same REPORT_TEMPLATE
        const existingReports = await OAL_REPORT_MODEL.find({
            REPORT_TEMPLATE,
            STATUS: {
                $ne: 'CLEAR'
            }
        }).populate({
            path: 'INITIAL_REPORT_TEMPLATE',
            populate: {
                path: 'SHIFT_MANAGER', // Replace 'yourNestedReference' with the actual field name
                // You can continue nesting as needed
            }
        })

        if (existingReports.length > 0) {
            console.log(existingReports)
            // If matching reports exist, return them to the client
            return res.status(200).json({
                status: 'success',
                action: 'create',
                ref: 'fetchall oal inadp report',
                alert: 'Matching oal reports already exist',
                availability: 'already-created',
                payloaddata: existingReports
            });
            res.end()
        }

        // Create a new report instance with REPORT_TEMPLATE and other fields
        const newReport = new OAL_REPORT_MODEL({
            REPORT_TEMPLATE,
            INITIAL_REPORT_TEMPLATE:  REPORT_TEMPLATE,
            STATUS: 'INITIAL',
            NAME: '',
            AIRLINE: '',
            DEP_ARRV_FLIGHT: '',
            SECTOR: '',
            NATIONALITY: '',
            PNR: '',
            REMARKS: '',
            ...otherFields
        });

        // Save the new report to the database
        const savedReport = await newReport.save();

        // Now, use a separate query to populate the nested references
        const populatedReport = await OAL_REPORT_MODEL
            .findById(savedReport._id)
            .populate({
                path: 'INITIAL_REPORT_TEMPLATE',
                populate: {
                    path: 'SHIFT_MANAGER', // Replace 'SHIFT_MANAGER' with the actual field name
                    // You can continue nesting as needed
                }
            })
            

        // console.log(populatedReport);


        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'fetchall oal report',
            alert: 'New OAL Report added successfully',
            availability: 'new-created',
            payloaddata: [populatedReport]
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