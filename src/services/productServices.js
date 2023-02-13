const productModel = require('../models/productsModel');
const validations = require('./validations');

const { productValidations } = validations;

const getProductList = async () => {
  const result = await productModel.productList();
  return { type: null, message: result };
};

const getProductId = async (id) => {
  const error = await productValidations(id);
  if (error.type) return error;
  
  const productById = await productModel.getProductById(id);
  return { type: null, message: productById };
};

const getNewProduct = async (name) => {
  const productId = await productModel.productInsert(name);
  return getProductId(productId);
};

module.exports = {
  getProductList,
  getProductId,
  getNewProduct,
};