const asyncHandler = require("express-async-handler");
const Record = require('../models/Record');

// @desc Get all Records
// @route GET /Records
// @access Private
const getRecords = asyncHandler(async (req, res) => {
    const records = await Record.find();
    res.status(200).json(records);
});

// @desc Create new Record
// @route POST /Records
// @access Private
const createRecord = asyncHandler(async (req, res) => {
    const { company, type, jobTitle, date, receivedInterview, websiteLink, comment, click } = req.body;

    if (!company || !type || !jobTitle || !date || receivedInterview == null || !websiteLink || !comment || click == null) {
        res.status(400);
        throw new Error('Please provide all required record fields');
    }

    const newRecord = new Record({
        company, 
        type, 
        jobTitle, 
        date, 
        receivedInterview, 
        websiteLink, 
        comment, 
        click
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
});

module.exports = { getRecords, createRecord };
