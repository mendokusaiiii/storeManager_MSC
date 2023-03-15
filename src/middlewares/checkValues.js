const productsModel = require('../models/productsModel');

const checkFieldValid = async (req, res, next) => {
  const arrSale = req.body;
  const result = arrSale.map(async ({ quantity }) => {
    if (quantity <= 0) return [422, '"quantity" must be greater than or equal to 1'];
    if (!quantity) return [400, '"quantity" is required'];
  });
  const awaitResult = await Promise.all(result);
  const validate = awaitResult.some((item) => item !== undefined);
  const filtered = awaitResult.filter((item) => item !== undefined)[0];
  if (validate) {
    return res.status(filtered[0]).json({ message: filtered[1] });
  }
  next();
};

const checkProductExist = async (req, res, next) => {
  const arrSale = req.body;
  const result = arrSale.map(async ({ productId }) => {
    const findId = await productsModel.getProductById(productId);
    if (!findId) return [404, 'Product not found'];
  });
  const awaitResult = await Promise.all(result);
  const validate = awaitResult.some((item) => item !== undefined);
  const filtered = awaitResult.filter((item) => item !== undefined)[0];
  if (validate) {
    return res.status(filtered[0]).json({ message: filtered[1] });
  }
  next();
};

const checkFieldExist = async (req, res, next) => {
  const arrSale = req.body;
  for (let i = 0; i < arrSale.length; i += 1) {
      if (!('productId' in arrSale[i])) {
        return res.status(400).json({ message: '"productId" is required' });
      }
      if (!('quantity' in arrSale[i])) {
        return res.status(400).json({ message: '"quantity" is required' });
      }
  }
  return next();
};

module.exports = {
  checkFieldExist,
  checkFieldValid,
  checkProductExist,
};