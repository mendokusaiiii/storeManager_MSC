const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);


const { getAllProductList, getProduct } = require('../mocks/mockModel');

const {
  getProductList,
  getProductId,
  getNewProduct,
  getProductUpdate,
  getProductDeleted,
} = require('../../../src/controllers/productController')

const controller = require('../../../src/controllers/productController');

const productService = require('../../../src/services/productServices');

describe('Testando a productController', () => {
  describe('Testa se recupera toda a lista de produtos', () => {
    afterEach(sinon.restore);
    
    it('Testa se retorna status 200 com uma lista completa de arrays', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductList')
        .resolves({ type: null, message: getAllProductList });

      await controller.getProductList(req, res);


      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllProductList);
       })
       })
      describe('Testa se retorna apenas um objeto', () => {
        afterEach(sinon.restore);
    
        it('Testa se retorna um status 200 com apenas um objeto', async () => {
          const res = {};
          const req = {
            params: { id: 1 },
          };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon
            .stub(productService, 'getProductId')
            .resolves({ type: null, message: getProduct});

          await getProductId(req, res);

          expect(res.status).to.have.been.calledWith(200);
          expect(res.json).to.have.been.calledWith(getProduct);
        });
      });
      describe('Testa se é possivel inserir um produto', () => {
        afterEach(sinon.restore);
    
      	it('Testa se retorna um status 201 com a resposta: { request, id }', async () => {
          const res = {};
          const req = {
            body: { name: 'Product X' }
          };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon
            .stub(productService, 'getNewProduct')
            .resolves({ type: null, message: req });

          await getNewProduct(req, res);
      	})
      })
      describe('Testa se é possivel atualizar um produto', () => {
        afterEach(sinon.restore);
    
        it('Testa se retorna um status 200 com a resposta: { name, id } }', async () => {
          const res = {};
          const req = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon
            .stub(productService, 'getProductUpdate')
            .resolves({ status: 200, response: { name: 'XXX', id: 1 } });

          await getProductUpdate(req, res);
      	})
      })
      describe('Testa se deleta um produto', () => {
         afterEach(sinon.restore);
    
        it('Testa se retorna um status 204 ao deletar um produto', async () => {
          const res = {};
         const req = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon
            .stub(productService, 'getProductDeleted')
          .resolves({ status: 204 });

         await getProductDeleted(req, res);
      	})
    });
	// 	})
	 });
