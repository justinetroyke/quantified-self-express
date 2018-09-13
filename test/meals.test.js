process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../app');
const meal = require('../models/meal')

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

  describe('GET /api/v1/meals', () => {
    it('should return all meals in the database', done => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.length).to.eql(4);
        response.body[0].should.have.property('name');
        expect(response.body[0].name).to.eq("Breakfast");

        done();
      })
    })
  })

  describe('GET /api/v1/meals/:id', () => {
    it('should return specific meal for ID and associated foods', done => {
      chai.request(app)
        .get('/api/v1/meals/3/foods')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.id).to.equal(3)
          expect(response.body.name).to.equal("Lunch")
          expect(response.body.foods.length).to.equal(2)

          done();
        });
    });
  });
});
