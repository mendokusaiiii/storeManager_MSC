const express = require('express');
const productController = require('../controllers/productController');
const { validateSchemaId } = require('../middlewares/valuesValidation');

const router = express.Router();

router.get('/', productController.getProductList);
router.get('/:id', validateSchemaId, productController.getProductId);

module.exports = router;