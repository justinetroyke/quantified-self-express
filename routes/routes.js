var express = require('express');
var router = express.Router()
var cors = require('cors')
express().use(cors())

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
router.use(cors());

// router.get('/foods', cors(), (request, response, next)=>{
//   database('foods').select()
//     .then((foods)=>{
//       response.status(200).json(foods)
//     })
//     .catch((error)=>{
//       response.status(500).json({error})
//     });
// });



router.get('/meals', cors(), (request, response, next)=>{
  database('meals').select()
    .then((meals)=>{
      response.status(200).json(meals)
    })
    .catch((error)=>{
      response.status(500).json({error})
    });
});

// router.get('/foods/:id', cors(), (request, response, next)=>{
//   let id = request.params.id
//   database('foods').select().where('id', id)
//     .then((foods)=>{
//       response.status(200).json(foods[0])
//     })
//     .catch((error)=>{
//       response.status(500).json({error})
//     });
// });

router.get('/meals/:id/foods', async(request, response, next)=>{
  let id = request.params.id
  let meal = await database('meals').where({id:id}).select()
  let foods = await Meal.foods(meal[0].id)
    meal[0].foods = foods
    response.status(200).json(meal[0])
    .catch((error)=>{
      response.status(404).json({error:"meal not found"})
    });
});

// router.post('/foods', cors(), (request, response, next)=>{
//   let food_params = request.body.food
//   database('foods').insert(food_params, 'id')
//       .returning(['id', 'name', 'calories'])
//       .then((food) => {
//         return (food[0])
//       })
//       .catch(error => {
//         response.status(500).json({ error });
//       });
// });

module.exports = router;
