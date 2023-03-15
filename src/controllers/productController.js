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

const getNewProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productServices.getNewProduct(name);
  if (type) return res.status(errors.statusE(type)).json(message);

  return res.status(201).json(message);
};

const getProductUpdate = async (req, res) => {
  const { status, response } = await productServices.getProductUpdate(req);
  res.status(status).json(response);
};

const getProductDeleted = async (req, res) => {
  const { status, response } = await productServices.getProductDeleted(req);
  res.status(status).json(response);
};

const getSearchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, response } = await productServices.getSearchProduct(q);
  res.status(status).json(response);
};

module.exports = {
  getProductList,
  getProductId,
  getNewProduct,
  getProductUpdate,
  getProductDeleted,
  getSearchProduct,
};
