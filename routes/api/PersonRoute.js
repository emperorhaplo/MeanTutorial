var express = require('express');

var router = express.Router()

var PersonRouter = require('../../controllers/PersonController');

router.get('/', PersonRouter.getPerson)
router.post('/', PersonRouter.addPerson)
router.put('/', PersonRouter.updatePerson)
router.delete('/', PersonRouter.deletePerson)

module.exports = router