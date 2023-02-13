const errors = {
  EMPTY_VALUE: 400,
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const statusE = (type) => errors[type] || 500;

module.exports = {
  errors,
  statusE,
};