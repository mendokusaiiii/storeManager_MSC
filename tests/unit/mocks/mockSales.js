const products = [
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 },
  { sale_id: 2, product_id: 3, quantity: 15 },
]

const invalidProduct = [
  { sale_id: 1, product_id: 9999, quantity: 5 },
  { sale_id: 1, product_id: 8888, quantity: 10 },
  { sale_id: 2, product_id: 7777, quantity: 15 },
]

const salesObj = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
  {
    "productId": 3,
    "quantity": 5
  }
]

const invalidProductId = [
  {
    "a": 1,
    "quantity": 1
  },
  {
    "c": 2,
    "quantity": 5
  }
]

const invalidQuantity = [
  {
    "productId": 1,
    "a": 1
  },
  {
    "productId": 2,
    "b": 5
  }
]

const quantityEqualZero = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 0
  }
]

const soldProduct = [
  {
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const allSales = [
  {
    "saleId": 1,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 3,
    "quantity": 15
  }
]

module.exports = {
  products,
  salesObj,
  invalidProductId,
  invalidQuantity,
  quantityEqualZero,
  invalidProduct,
  allSales,
  soldProduct,
}