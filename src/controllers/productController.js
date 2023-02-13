const productServices = require('../services/productServices');
const errors = require('../utils/errors');

const getProductList = async (_req, res) => {
  const { type, message } = await productServices.getProductList();
  if (type) return res.status(errors.statusE(type)).json({ message });

  res.status(200).json(message);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getProductId(Number(id));

  if (type) return res.status(errors.statusE(type)).json({ message });

   return res.status(200).json(message);
};

module.exports = {
  getProductId,
  getProductList,
};
