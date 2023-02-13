const express = require('express');

const salesController = require('../controllers/salesController');
const {
  validateSchemaSale,
} = require('../middlewares/valuesValidation');

const router = express.Router();

router.post('/', validateSchemaSale, salesController.saleRegistration);
router.get('/', salesController.getSalesDetails);

module.exports = router;