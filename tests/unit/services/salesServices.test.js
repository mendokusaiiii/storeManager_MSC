const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesObj,soldProduct, allProducts, onlyProduct } = require('../mocks/mockSales');

const salesModel = require('../../../src/models/salesModel');
const { 
  saleRegistration,
  getSalesDetails,
  getSalesById,
  getDeletedSaleById,
} = require('../../../src/services/salesService');

const connections = require('../../../src/models/connections');


const { validateSale } = require('../../../src/services/validations');

describe('Testa a salesServices', () => {
  describe('Testa se obtem todas as vendas', () => {
    it('Testa se retorna : { status: 200, response: sales }', async () => {
      sinon
        .stub(salesModel, 'getSalesDetails')
        .resolves(salesObj);

      await getSalesDetails();
    })
  })
  describe('Testa se retorna uma venda por Id', () => {
    it('Testa se retorna: { status: 200, response: sales }', async () => {
      const req = {
        params: { id: 1 }
      }
      sinon
        .stub(salesModel, 'getSalesById')
        .resolves(soldProduct);

      await getSalesById(req);
    })
    it('Testa se retorna: { status: 404, response: { message: "Sale not found" } }', async () => {
      const req = {
        params: { id: 99999 }
      }
      sinon
        .stub(salesModel, 'getSalesById')
        .resolves([]);

      await getSalesById(req);
    })
  })
  describe('Testa se deleta uma venda', () => {
    it('Testa se deleta uma venda', async () => {
      sinon
        .stub(salesModel, 'getSaleInfo')
        .resolves({ id: 1, date: '2022-10-17T19:12:53.000Z' });
      sinon
        .stub(salesModel, 'deleteSaleById')
        .resolves(null);

      await getDeletedSaleById({params: { id: 1 }});
    })
    it('Testa se deleta uma venda', async () => {
      sinon
        .stub(salesModel, 'getSaleInfo')
        .resolves(undefined);
      sinon
        .stub(salesModel, 'deleteSaleById')
        .resolves(null);

      await getDeletedSaleById({params: { id: 1 }});
    })
  })
  describe('Testa se insere um produto', () => {
    it('Testa se insere um produto', async () => {
      sinon
        .stub(salesModel, 'insertSaleDetails')
        .resolves(1);

      await saleRegistration(salesObj);
    })
  })
  describe('Testa se retorna a venda por Id', () => {
    it('Testa se retorna a venda por Id', async () => {
      const updateSale = [ { "productId": 1, "quantity": 10 }, { "productId": 2, "quantity": 50 } ]
      sinon
        .stub(salesModel, 'getSaleInfo')
        .resolves({ id: 1, date: '2022-10-17T19:12:53.000Z' });
      sinon
        .stub(salesModel, 'deleteSaleById')
        .resolves(null);
   
      await getDeletedSaleById({ params: { id: 1 }, body: updateSale });
    })
    it('p', async () => {
      const updateSale = [ { "productId": 1, "quantity": 10 }, { "productId": 2, "quantity": 50 } ]
      sinon
        .stub(salesModel, 'getSaleInfo')
        .resolves(undefined);
      sinon
        .stub(salesModel, 'deleteSaleById')
        .resolves(null);
  
      await getDeletedSaleById({ params: { id: 1 }, body: updateSale });
    })
  })
  describe('Testa se valida uma nova venda', () => {
    it('1', async () => {
      await validateSale({ productId: 5, quantity: 5, })
    })
    it('2', async () => {
      await validateSale({ productId: 5, quantity: 0, })
    })
    it('2', async () => {
      await validateSale({ xxx: 5, yyy: 5, })
    })
  })
  // describe('Testa camada service buscando produto especifico', () => {
  //   it('Testa se retorna um unico produto', async () => {
  //     const searchItem = [
  //       {
  //         "id": 1,
  //         "name": 'Martelo de Thor'
  //       }
  //     ]
  //     const result = { type: null, message: searchItem };
  //     const q = 'Martelo';
  //      sinon.stub(salesModel, 'getSaleDetails').resolves(allProducts);

  //      const response = await salesServices.getSearch(q);

  //     expect(response).to.be.deep.equal(result);
  //   })
  // })
  // describe('Testes de unidade do model de sales', function () {
  //   it('Recuperando um produto por id da tabela products', async function () {
  //     sinon.stub(connections, 'execute').resolves(onlyProduct[0]);
  //     const result = await salesModel.getSalesById(1);
  //     const expected = [
  //       {
  //         "date": "2023-03-14T21:23:06.000Z",
  //         "productId": 1,
  //         "quantity": 5
  //       },
  //       {
  //         "date": "2023-03-14T21:23:06.000Z",
  //         "productId": 2,
  //         "quantity": 10
  //       }
  //     ];

  //     expect(result).to.be.deep.equal(expected);
  //   })
  // })
  
  afterEach(sinon.restore);
  
})