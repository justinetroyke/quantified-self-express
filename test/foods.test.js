process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const app = require('../app');

chai.use(chaiHttp);

const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

describe('Food endpoints', function() {
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

  describe('GET /api/v1/foods', () => {
    it('should return all foods in the database', done => {
      chai.request(app)
        .get('/api/v1/foods')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.length).to.equal(3);
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('calories')
          response.body[0].should.have.property('id')

          done();
        })
      })
    })

  context('GET /api/v1/food/:id', () => {
    it('should return specific food for ID', done => {
      chai.request(app)
        .get('/api/v1/foods/3')
        .end((error, response) => {
          expect(response).to.have.status(200);
          response.body.should.have.property('name')
          response.body.should.have.property('calories')
          response.body.should.have.property('id')

          done();
        });
    });
  });


  describe("GET /api/v1/foods/:id", () => {
    it('returns food corresponding to :id', (done) => {
      chai.request(app)
      .get('/api/v1/foods/1')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body.name).to.eq("Bagel");
        done();
      })
    })
  })
});
