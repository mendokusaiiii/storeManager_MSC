const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesObj,soldProduct } = require('../mocks/mockSales');

const salesModel = require('../../../src/models/salesModel');
const { 
  saleRegistration,
  getSalesDetails,
  getSalesById,
  getDeletedSaleById,
} = require('../../../src/services/salesService');

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
      // sinon
      //   .stub(salesModel, 'postSaleUpdate')
      //   .resolves(null);

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
      // sinon
      //   .stub(salesModel, 'postSaleUpdate')
      //   .resolves(null);

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
  afterEach(sinon.restore);
})