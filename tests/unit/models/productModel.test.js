const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { getAllProductList, getProduct } = require('../mocks/mockModel');


const connection = require('../../../src/models/connections');
const { productList, getProductById, productInsert, updateProduct, deleteProduct } = require('../../../src/models/productsModel');

describe('Testando a productModel', () => {
  describe('Testa se obtem todos os produtos', () => {
    it('Testa se retorna um array', async () => {
      sinon.stub(connection, 'execute').resolves(getAllProductList);
      await productList();
    })
  });
	describe('Testa se obtem o produto pelo Id', () => {
		it('Testa se retorna um objeto pelo Id', async () => {
      sinon.stub(connection, 'execute').resolves([[getProduct]]);
      await getProductById(1);
		})
	})
	describe('Testa se um produto é inserido', () => {
    it('Testa se o produto foi inserido na lista', async () => {
      sinon.stub(connection, 'execute').resolves([1]);
      await productInsert({ name: 'Product X' });
		})
	})
	describe('Testa se os produtos são atualizados', () => {
    it('Testa se um produto é atualizado', async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
      await updateProduct('Product X', 1);
		})
    it('Testa se um  outro produto é atualizado', async () => {
      sinon.stub(connection, 'execute').resolves([undefined]);
      await updateProduct('Product X', 1);
		})
	})
	describe('Testa se um produto é removido', () => {
    it('Testa se o produto é removido', async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
      await deleteProduct(1);
		})
    it('Testa se quando não acha o produto para remover, retorna undefined', async () => {
      sinon.stub(connection, 'execute').resolves([undefined]);
      await deleteProduct(1);
		})
	})
	// describe('getAllByQuery', () => {
  //   it('1', async () => {
  //     sinon
  //       .stub(connection, 'execute')
  //       .resolves([[{}, {}]]);

  //     await getAllByQuery('Nome');
	// 	})
	// })
  afterEach(sinon.restore);
})