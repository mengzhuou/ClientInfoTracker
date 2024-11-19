const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const limiter = require('../middleware/rateLimiter');

router.get('/', limiter, recordController.getRecords);
router.post('/', limiter, recordController.createRecord);
router.get('/drafts', limiter, recordController.getDrafts);
router.delete('/:id', limiter, recordController.deleteRecord);
router.put('/:id', limiter, recordController.updateRecord);

module.exports = router;
