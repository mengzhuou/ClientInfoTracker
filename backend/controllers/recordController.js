const asyncHandler = require("express-async-handler");
const Record = require('../models/Record');

// @desc Get all Records
// @route GET /Records
// @access Private
const getRecords = asyncHandler(async (req, res) => {
    const records = await Record.find({ draftStatus: false });
    res.status(200).json(records);
});

// @desc Get draft Records
// @route GET /Records/drafts
// @access Private
const getDrafts = asyncHandler(async (req, res) => {
    const drafts = await Record.find({ draftStatus: true });  // Only fetch draft records
    res.status(200).json(drafts);
});

// @desc Create new Record (Draft or Completed)
// @route POST /Records
// @access Private
const createRecord = asyncHandler(async (req, res) => {
    const { name, company, hobby, importantDate, note, familySituation,
        birthday, reasonOfKnowing, position, phoneNumber, email,
        additionalNote, draftStatus } = req.body;

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
        additionalNote,
        draftStatus
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
});

// @desc Delete a Record
// @route DELETE /Records/:id
// @access Private
const deleteRecord = asyncHandler(async (req, res) => {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
        res.status(404);
        throw new Error('Record not found');
    }

    res.status(200).json({ message: 'Record deleted' });
});

// @desc Update a Record
// @route PUT /Records/:id
// @access Private
const updateRecord = asyncHandler(async (req, res) => {
    const recordId = req.params.id;
    const updates = req.body;

    // Find and update the record, returning the updated document
    const record = await Record.findByIdAndUpdate(recordId, updates, {
        new: true, // Return the updated record instead of the old one
        runValidators: true, // Ensure validation rules in the schema are applied
    });

    if (!record) {
        res.status(404);
        throw new Error('Record not found');
    }

    res.status(200).json(record); // Send the updated record back as the response
});

module.exports = { getRecords, createRecord, getDrafts, deleteRecord, updateRecord };
