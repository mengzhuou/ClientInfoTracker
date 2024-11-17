const express = require("express");
const router = express.Router();
const accessCodeController = require("../controllers/accessCodeController");
const limiter = require('../middleware/rateLimiter');

router.get('/', limiter, accessCodeController.getAccessCodes);
router.post('/', limiter, accessCodeController.createAccessCode);

module.exports = router;
