const express = require('express');
const productController = require('../controllers/productController');
const { validateSchemaId, validateSchemaName } = require('../middlewares/valuesValidation');

const router = express.Router();

router.get('/', productController.getProductList);
router.get('/:id', validateSchemaId, productController.getProductId);
router.post('/', validateSchemaName, productController.getNewProduct);

module.exports = router;