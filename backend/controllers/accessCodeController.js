const asyncHandler = require("express-async-handler");
const AccessCode = require('../models/AccessCode');

// @desc Get all AccessCodes
// @route GET /AccessCodes
// @access Private
const getAccessCodes = asyncHandler(async (req, res) => {
    const accesscodes = await AccessCode.find();
    res.status(200).json(accesscodes);
});

// @desc Create new AccessCode
// @route POST /AccessCodes
// @access Private
const createAccessCode = asyncHandler(async (req, res) => {
    const { code } = req.body;

    if (!code) {
        res.status(400);
        throw new Error('Please provide all required record fields');
    }

    const newAccessCode = new AccessCode({
        code
    });

    const savedAccessCode = await newAccessCode.save();
    res.status(201).json(savedAccessCode);
});

module.exports = { getAccessCodes, createAccessCode };
