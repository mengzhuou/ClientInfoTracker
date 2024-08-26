const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const limiter = require('../middleware/rateLimiter');

router.get('/', limiter, recordController.getRecords);
router.post('/', limiter, recordController.createRecord);

module.exports = router;
