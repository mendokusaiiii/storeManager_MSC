const Joi = require('joi');

const schemaId = Joi.number().integer().min(1).required();

const productSchemaId = Joi.object({
  id: schemaId,
});
const schemaName = Joi.object({
  name: Joi.string().min(5).required(),
});

const schemaSale = Joi.object({
  productId: schemaId,
  quantity: schemaId,
});

module.exports = {
  productSchemaId,
  schemaName,
  schemaSale,
};