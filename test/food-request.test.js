process.env.NODE_ENV = 'test'

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'
import foods from './fixtures/foods'

chai.use(chaiHttp);

describe('Food Requests', () => {
  context('GET /api/v1/foods', () => {
    it('should return all foods in the database', done => {
      chai.request(app)
        .get('/api/v1/foods')
        .end((error, response) => {
          if (error) {
            console.error(error);
          }

          expect(response.body).to.deep.eq(foods)
          expect(response).to.have.status(200);

          done();
        });
    });
  });
});
