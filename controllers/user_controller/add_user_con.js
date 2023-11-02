// models
const UserModel = require('../../models/user_model/user_model');

// add new department controller
const adduser = async (req, res) => {
    try {
        const { UNDER_SHIFT, NAME, STAFF_ID, DESIGNATION, SUB_DESIGNATION, COPERATE_DESIGNATION } = req.body;

        // validation 
        // if (!UNDER_SHIFT) {
        //     return res.status(400).json({
        //         status: 'failed',
        //         action: 'create',
        //         ref: 'adduser',
        //         alert: 'UNDER_SHIFT is required',
        //         payloaddata: {}
        //     });
        // }

        if (!NAME) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adduser',
                alert: 'NAME is required',
                payloaddata: {}
            });
        }

        if (!STAFF_ID) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adduser',
                alert: 'STAFF ID is required',
                payloaddata: {}
            });
        }

        if (!DESIGNATION) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adduser',
                alert: 'DESIGNATION is required',
                payloaddata: {}
            });
        }
        
        if (!SUB_DESIGNATION) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adduser',
                alert: 'SUB DESIGNATION is required',
                payloaddata: {}
            });
        }

        if (!COPERATE_DESIGNATION) {
            return res.status(400).json({
                status: 'failed',
                action: 'create',
                ref: 'adduser',
                alert: 'COPERATE DESIGNATION is required',
                payloaddata: {}
            });
        }


        // Check if a report with the same REPORT_ID, DATE, and SHIFT exists
        const existingUSER = await UserModel.findOne({
            STAFF_ID
        })

        if (existingUSER) {
            // If a matching report exists, return it to the client
            return res.status(200).json({
                status: 'success',
                action: 'create',
                ref: 'adduser',
                alert: `It's look like the user with same staff id ${STAFF_ID} already exists!`,
                availabilty: 'already-created',
                payloaddata: existingUSER
            });
        }

        const newUser = await  UserModel({
            UNDER_SHIFT, NAME, STAFF_ID, DESIGNATION, SUB_DESIGNATION, COPERATE_DESIGNATION
        })

        const savedUSER = await newUser.save();

        res.status(201).json({
            status: 'success',
            action: 'create',
            ref: 'adduser',
            alert: 'New User added successfully',
            availabilty: 'new-created',
            payloaddata: savedUSER
        });
    } catch (error) {
        console.error('Error while adding new user:', error);
        res.status(500).json({
            status: 'failed',
            action: 'create',
            ref: 'adduser',
            alert: 'Error while adding a new USER',
            payloaddata: {}
        });
    }
}

module.exports = adduser;
