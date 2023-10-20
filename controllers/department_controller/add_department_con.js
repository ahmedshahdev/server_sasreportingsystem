// models
const DepartmentModel = require('../../models/department_model/department_model');

// add new department controller
const adddepartment = async (req, res) => {
    try {
        const { departmentsname } = req.body; // Assuming the department name is sent in the request body

        // Check if the department name is provided
        if (!departmentsname) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adddepartment',
                alert: 'Department name is required!',
                payloaddata: {}
            });
        }

        // Create a new department instance
        const newDepartment = new DepartmentModel({
            name: departmentsname,
        });

        // Save the new department to the database
        const savedDepartment = await newDepartment.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'adddepartment',
            alert: 'New Department added successfully',
            payloaddata: {}
        }); // Respond with the saved department
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'adddepartment',
            alert: 'Error while adding new department',
            payloaddata: {}
        }); // Respond with the saved department
    }

}

module.exports = adddepartment;
