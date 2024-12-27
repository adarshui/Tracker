const express = require('express');
const router = express.Router();
const communicationMethodController = require('../controllers/communicationMethodController');

router.post('/', communicationMethodController.addCommunicationMethod);
router.get('/', communicationMethodController.getAllCommunicationMethods);
router.put('/:id', communicationMethodController.updateCommunicationMethod);
router.delete('/:id', communicationMethodController.deleteCommunicationMethod);

module.exports = router;
