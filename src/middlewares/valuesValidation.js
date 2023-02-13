const { productSchemaId, schemaName } = require('../utils/schema');

const validateSchemaId = (req, res, next) => {
  const { id } = req.params;

  const { error } = productSchemaId.validate({ id });
  if (error) return res.status(422).json({ message: error.message });

  next();
};

const validateSchemaName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name === '' || name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  
  const { error } = schemaName.validate({ name });
  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

module.exports = {
  validateSchemaId,
  validateSchemaName,
};