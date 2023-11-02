// models
const UserModel = require('../../models/user_model/user_model');

// add new department controller
const fetchuser = async (req, res) => {
    const {DESIGNATION, STAFF_ID } = req.body;
    
    const filter = {};

    if (DESIGNATION) {
        filter.DESIGNATION =  DESIGNATION;
    }

    if (STAFF_ID) {
        filter.STAFF_ID = STAFF_ID;
    }


    try {
        // Retrieve all users from the database
        const users = await UserModel.find(filter);

        res.status(200).json({
            status: 'success',
            action: 'view',
            ref: 'viewreport',
            alert: 'Users retrieved successfully',
            payloaddata: users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            status: 'failed',
            action: 'view',
            ref: 'viewreport',
            alert: 'Error while retrieving Users',
            payloaddata: []
        });
    }
}

module.exports = fetchuser;