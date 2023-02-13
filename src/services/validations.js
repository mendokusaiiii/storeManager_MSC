const model = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const productValidations = async (id) => {
  const productDetail = await model.getProductById(id);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateSale = async (id) => {
  const validateDetails = await salesModel.getSaleInfo(id);
  if (!validateDetails || validateDetails.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  productValidations,
  validateSale,
};