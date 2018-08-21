const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');


const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
chai.use(chaiHttp);

before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
    .then( () => {
      return Promise.all([
        database('foods').insert({name:"pickle", calories: 0, id:1}, 'id'),
        database('foods').insert({name:"cilantro", calories: 1, id:2}, 'id'),
        database('foods').insert({name:"green onion", calories: 5, id:3}, 'id')
      ])
    })    .then( ()=>{
      return Promise.all([
        database('meal_foods').insert({meals_id:1, food_id:1}, 'id'),
        database('meal_foods').insert({meals_id:2, food_id:2}, 'id'),
        database('meal_foods').insert({meals_id:3, food_id:3}, 'id'),
        database('meal_foods').insert({meals_id:4, food_id:3}, 'id'),
        database('meal_foods').insert({meals_id:3, food_id:2}, 'id'),
        database('meal_foods').insert({meals_id:2, food_id:1}, 'id'),
      ])
    })
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

describe('Meal Requests', () => {
  context('GET /api/v1/meals', () => {
    it('should return all meals in the database', done => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.length).to.equal(4);
          response.body[0].should.have.property('name')

          done();
        });
    });
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

  // describe('post /api/v1/food/:id', () => {
  //   it('should create a food for ID', done => {
  //     let name = 'PB'
  //     let calories = 85
  //     chai.request(app)
  //       .post('/api/v1/foods')
  //       .send({
  //         food:{
  //           name:name,
  //           calories:calories
  //         }
  //       }).end((err, response) => {
  //         expect(response).to.have.status(200);
  //         response.body.should.have.property('name')
  //         response.body.should.have.property('calories')
  //         response.body.should.have.property('id')
  //         done();
  //       });
  //     done();
  //   });
  // });
});
