// models
const ReportCategoryModel = require('../../models/report_model/report_category_model');

// add new department controller
const viewreportcategory = async (req, res) => {
    try {
        // Retrieve all report categories from the database
        const reportCategories = await ReportCategoryModel.find();

        res.status(200).json({
            status: 'success',
            action: 'view',
            ref: 'viewreportcategory',
            alert: 'Report Categories retrieved successfully',
            payloaddata: reportCategories
        });
    } catch (error) {
        console.error('Error retrieving report categories:', error);
        res.status(500).json({
            status: 'failed',
            action: 'view',
            ref: 'viewreportcategory',
            alert: 'Error while retrieving report categories',
            payloaddata: []
        });
    }
}

module.exports = viewreportcategory;
