const salesModel = require('../models/salesModel');

const { productValidations, validateSale } = require('./validations');

const saleRegistration = async (sales) => {
  const validateId = sales.map((item) => {
    const error = productValidations(item.productId);
    return error;
  });

  const idsValidated = await Promise.all(validateId);

  if (idsValidated.every((error) => error.type === null)) {
    const saleId = await salesModel.insertNewSale();

    const registration = sales.map((item) => {
      const { productId, quantity } = item;
      return salesModel.insertSaleDetails(saleId, productId, quantity);
    });
    await Promise.all(registration);
    const data = await salesModel.findById(saleId);
    const result = { id: saleId, itemsSold: data };
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const getSalesDetails = async () => {
  const result = await salesModel.getSalesDetails();
  return { type: null, message: result };
};

const getSalesById = async (id) => {
  const error = await validateSale(id);
  if (error.type) return error;

  const result = await salesModel.getSalesById(id);
  return { type: null, message: result };
};

module.exports = {
  saleRegistration,
  getSalesDetails,
  getSalesById,
};
