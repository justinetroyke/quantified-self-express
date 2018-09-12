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
          response.body.should.have.property('name')
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('Lunch')
          response.body[0].id.should.equal(3)
          response.body[0].foods.length.should.equal(2)

          done();
        });
      done();
    });
  });

  describe('post /api/v1/food/:id', () => {
    it('should create a food for ID', done => {
      let name = 'PB'
      let calories = 85
      chai.request(app)
        .post('/api/v1/foods')
        .send({
          food:{
            name:name,
            calories:calories
          }
        }).end((err, response) => {
          expect(response).to.have.status(200);
          response.body.should.have.property('name')
          response.body.should.have.property('calories')
          response.body.should.have.property('id')
          done();
        });
      done();
    });
  });
});
