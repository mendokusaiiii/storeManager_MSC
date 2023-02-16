const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesObj, allSales } = require('../mocks/mockSales');

const connection = require('../../../src/models/connections')
const { 
  getSalesDetails,
  getSalesById,
  findById,
  insertNewSale,
  insertSaleDetails,
  getSaleInfo,
  deleteSaleById,
} = require('../../../src/models/salesModel');

describe('Testa a  salesModel', () => {
  describe('Testa se insere um produto', () => {
    it('Testa se retorna um objeto com um unico produto', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves([{ insertId: 10 }]);

      await insertNewSale(allSales);
    })
  })
  describe('Testa se retorna todas as vendas', () => {
    it('', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves(salesObj);

      await getSalesDetails();
    })
  })
	describe('Testa se retorna a venda por Id', () => {
    it('Testa se retorna uma venda por id', async () => {
      const res = [ { "date": "2022-10-17T19:12:53.000Z", "productId": 3, "quantity": 15 } ]
      sinon
        .stub(connection, 'execute')
        .resolves(res);

      await getSalesById(1);
		})
	})
	describe('Testa se deleta uma venda por id', () => {
    it('Testa se deleta uma venda', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves([{}]);

      await deleteSaleById(1);
		})
	})
	describe('Testa se retorna informações da venda', () => {
    it('Testa se retorna uma informação da venda', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves([[{}]]);

      await getSaleInfo(1);
		})
	})
	describe('Testa se deleta uma venda por id', () => {
    it('Testa se deleta ', async () => {
      sinon
        .stub(connection, 'execute')
        .resolves([{}]);

      await deleteSaleById(1);
		})
	})
  afterEach(sinon.restore);
})