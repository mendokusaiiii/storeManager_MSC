const express = require('express');

const salesController = require('../controllers/salesController');
const {
  validateSchemaSale,
} = require('../middlewares/valuesValidation');

const {
  checkFieldExist,
  checkFieldValid,
  checkProductExist,
} = require('../middlewares/checkValues');

const router = express.Router();

router.post('/', validateSchemaSale, salesController.saleRegistration);
router.get('/', salesController.getSalesDetails);
router.get('/:id', salesController.getSalesById);
router.delete('/:id', salesController.getDeletedSaleById);
router.put('/:id', checkFieldExist,
  checkFieldValid, checkProductExist, salesController.getUpdatedSale);

module.exports = router;