const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { getAllProductList, getProduct } = require('../mocks/mockModel');

const {
  getProductList,
  getProductId,
  getNewProduct,
  getProductUpdate,
  getProductDeleted,
} = require('../../../src/services/productServices');

const  productsModel  = require('../../../src/models/productsModel');

describe('Testando a productServices', () => {
  describe('Testa se recupera toda a lista de produtos', () => {
    afterEach(sinon.restore);
    
    it('Testa se retorna uma lista completa de arrays', async () => {
      sinon.stub(productsModel, 'productList').resolves(getAllProductList);
      await getProductList();
		})
	})
  describe('Testa se retorna apenas um objeto', () => {
    afterEach(sinon.restore);
    
    it('Testa se retorna um objeto com um unico produto', async () => {
      const req = {
        params: { id: 1 },
      };

      sinon.stub(productsModel, 'getProductById').resolves(getProduct);
      await getProductId(req);
		})
		it('Testa se retorna um objeto vazio', async () => {
      const req = {
        params: { id: 99999 },
      };

      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      await getProductId(req);
		})
  })
  // describe('Testa se é possivel inserir um produto', () => {
  //    afterEach(sinon.restore);
  //   it('Testa se retorna: { status: 201, response: { ...request, id } }', async () => {
  //      const req = {
  //       body: { name: 'Product X' },
  //     };

  //     sinon.stub(productsModel, 'productInsert').resolves(1);
  //     await getNewProduct(1);
	// 	})
    
    
  //   it('Testa se retorna: { status: 400, response: { message: ""name" is required" }', async () => {
  //     const req = {
  //       body: { name: '' },
  //     };

  //     sinon.stub(productsModel, 'productInsert').resolves(1);
  //     await getNewProduct(req);
	// 	})
  //   it('Testa se retorna: { status: 400, response: { message: ""name" is required" }', async () => {
  //     const req = {
  //       body: { xxxxx: 'Product X' },
  //     };

  //     sinon.stub(productsModel, 'productInsert').resolves(1);
  //     await getNewProduct(req);
	// 	})
  //   it('Testa se retorna: { status: 422, response: { message: ""name" length must be at least 5 characters long" }', async () => {
  //     const req = {
  //       body: { name: 'P' },
  //     };

  //     sinon.stub(productsModel, 'productInsert').resolves(1);
  //     await getNewProduct(req);
  //   })
  // })
  describe('Testa se é possivel atualizar um produto', () => {
    afterEach(sinon.restore);
    
    it('Success', async () => {
      sinon.stub(productsModel, 'getProductById').resolves({ id: 1, name: 'Current name' });
      sinon.stub(productsModel, 'updateProduct').resolves({ affectedRows: 1 });
      await getProductUpdate({ body: { name: "New name" }, params: { id: 1 } })
    })
    it('Testa se retorna um erro', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      sinon.stub(productsModel, 'updateProduct').resolves({ affectedRows: 1 });
      await getProductUpdate({ body: { name: "New name" }, params: { id: 1 } })
    })
  })
  describe('Testa se deleta um produto', () => {
    afterEach(sinon.restore);
    
    it('Testa se tem sucesso ao deletar ', async () => {
      sinon.stub(productsModel, 'getProductById').resolves({ id: 1, name: 'Current name' });
      sinon.stub(productsModel, 'deleteProduct').resolves({ affectedRows: 1 });
      await getProductDeleted({ params: { id: 1 } })
    })
    it('Testa se retorna erro', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      sinon.stub(productsModel, 'deleteProduct').resolves({ affectedRows: 1 });
      await getProductDeleted({ params: { id: 1 } })
    })
  })
})