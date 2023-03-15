const connection = require('./connections');

const productList = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const productInsert = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [newProduct],
  );
  return insertId;
};

const updateProduct = async (name, id) => {
  const data = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(data, [name, id]);
  return result ? result.affectedRows : result;
};

const deleteProduct = async (id) => {
  const data = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(data, [id]);
  return result ? result.affectedRows : result;
};

const searchByQuery = async (search) => {
 const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE \'%Martelo%\'',
    [search],
  );
  return result;
};

module.exports = {
  productList,
  getProductById,
  productInsert,
  updateProduct,
  deleteProduct,
  searchByQuery,
};