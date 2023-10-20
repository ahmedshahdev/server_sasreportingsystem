// models
const ReportCategoryModel = require('../../models/report_model/report_category_model');

// add new department controller
const addreportcategory = async (req, res) => {
    try {
        const { reportcategoryname } = req.body; // Assuming the department name is sent in the request body

        // Check if the department name is provided
        if (!reportcategoryname) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'addreportcategory',
                alert: 'Report Category Name is required',
                payloaddata: {}
            });
        }

        // Create a new department instance
        const NewReportCategoryModel = new ReportCategoryModel({
            name: reportcategoryname,
        });

        // Save the new department to the database
        const savedReportCategory = await NewReportCategoryModel.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'addreportcategory',
            alert: 'New Report Category added successfully',
            payloaddata: {}
        }); // Respond with the saved department
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'addreportcategory',
            alert: 'Error while adding new Report Category',
            payloaddata: {}
        }); // Respond with the saved department
    }

}

module.exports = addreportcategory;
