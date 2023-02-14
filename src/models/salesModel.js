const camelize = require('camelize');
const connection = require('./connections');

const getSalesDetails = async () => {
  const [result] = await connection.execute(
    `SELECT details.sale_id, sales_date.date, details.product_id, details.quantity 
    FROM StoreManager.sales_products AS details
    INNER JOIN StoreManager.sales AS sales_date
    ON details.sale_id = sales_date.id;`,
  );

  return camelize(result);
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sales_date.date, details.product_id, details.quantity 
    FROM StoreManager.sales_products AS details
    INNER JOIN StoreManager.sales AS sales_date
    ON details.sale_id = sales_date.id
    WHERE sale_id = ?;`,
    [id],
    );
    console.log(id);

  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?
    ORDER BY product_id;`,
    [id],
  );

  return camelize(result);
};
const insertNewSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (DEFAULT);');
  return insertId;
};

const insertSaleDetails = async (saleId, productId, quantity) => connection.execute(
  `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (?, ?, ?);`,
  [saleId, productId, quantity],
);

const getSaleInfo = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return result;
};

const deleteSaleById = async (id) => {
  const deleteSale = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(deleteSale, [id]);
  return result;
};

module.exports = {
  getSalesDetails,
  getSalesById,
  findById,
  insertNewSale,
  insertSaleDetails,
  getSaleInfo,
  deleteSaleById,
};