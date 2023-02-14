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

const getProductUpdate = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateProduct = await productModel.getProductById(id);
  if (updateProduct === undefined) {
    return { status: 404, response: { message: 'Product not found' } };
  }
  const result = await productModel.updateProduct(name, id);
  return result && { status: 200, response: { name, id } };
};

const getProductDeleted = async (req) => {
  const { id } = req.params;
  const productDel = await productModel.getProductById(id);
  if (productDel === undefined) {
    return { status: 404, response: { message: 'Product not found' } };
  }
  const result = await productModel.deleteProduct(id);
  return result && { status: 204 };
};

module.exports = {
  getProductList,
  getProductId,
  getNewProduct,
  getProductUpdate,
  getProductDeleted,
};