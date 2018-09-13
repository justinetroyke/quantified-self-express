process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../app');
const Food = require('../models/food')

const environment = 'test'
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);
chai.use(chaiHttp);

describe('Meal endpoints', function() {
  beforeEach((done) => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
      })
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/favoite_foods', () => {
    it('returns foods on multiple meals', (done) => {
    chai.request(app)
    .get('/api/v1/favorite_foods')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      expect(response.body[0].timeseaten).to.eql('2');
      expect(response.body[0].foods[0].mealsWhenEaten).to.be.an('array');

      done();
      })
    });
  })
});
