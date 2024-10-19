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
    const { name, company, hobby, importantDate, note, familySituation,
        birthday, reasonOfKnowing, position, phoneNumber, email,
        additionalNote} = req.body;

    const newRecord = new Record({
        name,
        company,
        hobby,
        importantDate,
        note,
        familySituation,
        birthday,
        reasonOfKnowing,
        position,
        phoneNumber,
        email,
        additionalNote
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
});

module.exports = { getRecords, createRecord };
