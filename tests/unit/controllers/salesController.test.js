const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesObj, soldProduct } = require('../mocks/mockSales');

const salesService = require('../../../src/services/salesService');
const { 
  saleRegistration,
  getSalesDetails,
  getSalesById,
  getDeletedSaleById,
} = require('../../../src/controllers/salesController');

describe('Testa o salesController', () => {
  describe('Testa se é possivel fazer uso de multiplas vendas', () => {
    afterEach(sinon.restore);
    it('Testa se retorna um status 201', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'saleRegistration')
        .resolves({ status: 201, response: { id: 1, itemsSold: [...salesObj] } });

      await saleRegistration(req, res);
    })
  })
  describe('Testa se retorna todas as vendas', () => {
    afterEach(sinon.restore);
    it('Testa se retorna um status 200', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSalesDetails')
        .resolves({ status: 200, response: salesObj });

      await getSalesDetails(req, res);
    })
  })
  describe('Testa se retorna uma venda por id', () => {
    afterEach(sinon.restore);
    it('Testa se retorna uma venda por id com status 200', async () => {
      const res = {};
      const req = { params: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSalesById')
        .resolves({ status: 200, message: soldProduct });

      await getSalesById (req, res);
    })
  })
  describe('Testa se deleta uma venda', () => {
    afterEach(sinon.restore);
    it('Testa se deleta uma venda e retorna status 204', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getDeletedSaleById')
        .resolves({ status: 204 });

      await getDeletedSaleById(req, res);
    })
  })
  describe('Testa se insere uma venda', () => {
    afterEach(sinon.restore);
    it('Testa se retorna', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: salesObj
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getDeletedSaleById')
        .resolves({ status: 200, message: { saleId: 1, itemsUpdated: salesObj } });
      await getDeletedSaleById(req, res)
    })
  })
});