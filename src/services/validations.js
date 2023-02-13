const model = require('../models/productsModel');

const productValidations = async (id) => {
  const productDetail = await model.getProductById(id);
  if (!productDetail) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  productValidations,
};