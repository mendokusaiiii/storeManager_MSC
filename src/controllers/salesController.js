const salesService = require('../services/salesService');
const { statusE } = require('../utils/errors');

const saleRegistration = async (req, res) => {
  const result = req.body;

  const { type, message } = await salesService.saleRegistration(result);
  if (type) return res.status(statusE(type)).json({ message });

  return res.status(201).json(message);
};

const getSalesDetails = async (_req, res) => {
  const { type, message } = await salesService.getSalesDetails();
  if (type) return res.status(statusE(type)).json({ message });

  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(statusE(type)).json({ message });

  return res.status(200).json(message);
};

const getDeletedSaleById = async (req, res) => {
  const { status, response } = await salesService.getDeletedSaleById(req);
  res.status(status).json(response);
};

const getUpdatedSale = async (req, res) => {
  const { status, response } = await salesService.updatedSale(req);
  res.status(status).json(response);
};
module.exports = {
  saleRegistration,
  getSalesDetails,
  getSalesById,
  getDeletedSaleById,
  getUpdatedSale,
};