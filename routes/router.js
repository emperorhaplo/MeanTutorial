var express = require('express');
var router = express.Router();
var personRoute = require('./api/PersonRoute')

router.use('/person', personRoute)

module.exports = router;
