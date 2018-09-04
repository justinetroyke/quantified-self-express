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
        database('foods').insert({name:"Bagel", calories: 220, id:1}, 'id'),
        database('foods').insert({name:"Turkey Sandwich", calories: 280, id:2}, 'id'),
        database('foods').insert({name:"Eggs", calories: 85, id:3}, 'id')
      ])
    })    .then( ()=>{
      return Promise.all([
        database('meal_foods').insert({meals_id:1, food_id:1}, 'id'),
        database('meal_foods').insert({meals_id:2, food_id:1}, 'id'),
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

// describe('Favorite Food Requests', () => {
//   context('GET /api/v1/favorite_foods', () => {
//     it('should return most eaten foods in the database', done => {
//       chai.request(app)
//         .get('/api/v1/favorite_foods')
//         .end((error, response) => {
//           expect(response).to.have.status(200);
//           expect(response.body.length).to.equal(1);
//           fav_food = response.body[0]
//           fav_food.should.have.property('name')
//           fav_food.should.have.property('calories')
//           fav_food.should.have.property('id')
//           expect(fav_food.name).to.eq("Bagel")
//
//           done();
//         });
//     });
//   })
// });
